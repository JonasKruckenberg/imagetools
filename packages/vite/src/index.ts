import { basename, extname } from 'node:path'
import { relative } from 'node:path/posix'
import { statSync, mkdirSync } from 'node:fs'
import { readFile, opendir, stat, rm } from 'node:fs/promises'
import { normalizePath, type Plugin, type ResolvedConfig } from 'vite'
import {
  applyTransforms,
  builtins,
  builtinOutputFormats,
  extractEntries,
  generateTransforms,
  parseURL,
  urlFormat,
  resolveConfigs,
  type Logger,
  type OutputFormat,
  type ProcessedImage,
  type ImageMetadata,
  type ImageConfig
} from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import sharp, { type Metadata, type Sharp } from 'sharp'
import { createBasePath, generateImageID, hash, writeFileAtomic } from './utils.js'
import type { VitePluginOptions } from './types.js'

/**
 * The subset of Rolldown's `RollupError` the plugin sets on errors it rethrows,
 * so Vite reports which module failed to load. `vite` does not re-export this.
 */
interface PluginError extends Error {
  id?: string
}

export type {
  Include,
  Exclude,
  DefaultDirectives,
  ExtendTransforms,
  ExtendOutputFormats,
  ResolveConfigs,
  VitePluginOptions
} from './types.js'

const defaultOptions: VitePluginOptions = {
  include: /^[^?]+\.(avif|gif|heif|jpeg|jpg|png|tiff|webp)(\?.*)?$/,
  exclude: 'public/**/*',
  removeMetadata: true
}

type LoadHook = NonNullable<Plugin['load']>
type LoadFn = LoadHook extends infer T ? (T extends { handler: infer H } ? H : T) : never
type LoadContext = ThisParameterType<LoadFn>

export * from 'imagetools-core'

const transformPromises = new Map<string, Promise<ProcessedImage>>()

export function imagetools(userOptions: Partial<VitePluginOptions> = {}): Plugin {
  const pluginOptions: VitePluginOptions = { ...defaultOptions, ...userOptions }

  const cacheOptions = {
    enabled: pluginOptions.cache?.enabled ?? true,
    dir: pluginOptions.cache?.dir ?? './node_modules/.cache/imagetools',
    retention: pluginOptions.cache?.retention
  }
  mkdirSync(`${cacheOptions.dir}`, { recursive: true })

  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  const transformFactories = pluginOptions.extendTransforms ? pluginOptions.extendTransforms(builtins) : builtins

  const outputFormats: Record<string, OutputFormat> = pluginOptions.extendOutputFormats
    ? pluginOptions.extendOutputFormats(builtinOutputFormats)
    : builtinOutputFormats

  let viteConfig: ResolvedConfig
  let basePath: string

  const generatedImages = new Map<string, ProcessedImage>()
  const transformImage = async (id: string, ctx: LoadContext): Promise<string | null> => {
    const srcURL = parseURL(id)
    const pathname = decodeURIComponent(srcURL.pathname)

    // lazy loaders so that we can load the metadata in defaultDirectives if needed
    // but if there are no directives then we can just skip loading
    let lazyImg: Sharp
    const lazyLoadImage = () => {
      if (lazyImg) return lazyImg
      return (lazyImg = sharp(pathname))
    }

    let lazyMetadata: Metadata
    const lazyLoadMetadata = async () => {
      if (lazyMetadata) return lazyMetadata
      return (lazyMetadata = await lazyLoadImage().metadata())
    }

    const defaultDirectives =
      typeof pluginOptions.defaultDirectives === 'function'
        ? await pluginOptions.defaultDirectives(srcURL, lazyLoadMetadata)
        : pluginOptions.defaultDirectives || new URLSearchParams()
    const directives = new URLSearchParams({
      ...Object.fromEntries(defaultDirectives),
      ...Object.fromEntries(srcURL.searchParams)
    })

    if (!directives.toString()) return null

    const img = lazyLoadImage()
    const widthParam = directives.get('w')
    const heightParam = directives.get('h')
    if (directives.get('allowUpscale') !== 'true' && (widthParam || heightParam)) {
      const metadata = await lazyLoadMetadata()
      const clamp = (s: string, intrinsic: number) => {
        // an unknown intrinsic size means the metadata did not expose
        // dimensions, so there is nothing to clamp against
        if (intrinsic <= 0) return s
        return [
          ...new Set(
            s.split(';').map((d): string => {
              const value = Number(d)
              // leave non-integer values untouched so the transform reports
              // the invalid directive instead of silently substituting the intrinsic size
              return !Number.isInteger(value) ? d : value <= intrinsic ? d : intrinsic.toString()
            })
          )
        ].join(';')
      }

      if (widthParam) {
        const intrinsicWidth = metadata.width || 0
        directives.set('w', clamp(widthParam, intrinsicWidth))
      }

      if (heightParam) {
        const intrinsicHeight = metadata.height || 0
        directives.set('h', clamp(heightParam, intrinsicHeight))
      }
    }

    const parameters = extractEntries(directives)
    const imageConfigs =
      pluginOptions.resolveConfigs?.(parameters, outputFormats) ?? resolveConfigs(parameters, outputFormats)

    const logger: Logger = {
      info: (msg) => viteConfig.logger.info(msg),
      warn: (msg) => ctx.warn(msg),
      error: (msg) => ctx.error(msg)
    }

    // hash the source bytes to avoid going through Sharp which would result in an image decode
    const imageHash = hash([await readFile(pathname)])

    const executeTransform = async (imageId: string, imageConfig: ImageConfig): Promise<ProcessedImage> => {
      let image: Sharp | undefined
      let metadata: ImageMetadata
      let raw: Metadata
      let cachedBuffer: Buffer | undefined

      if (
        cacheOptions.enabled &&
        (statSync(`${cacheOptions.dir}/${imageId}`, { throwIfNoEntry: false })?.size ?? 0) > 0
      ) {
        cachedBuffer = await readFile(`${cacheOptions.dir}/${imageId}`)
        image = sharp(cachedBuffer)
        raw = await image.metadata()
        // On a cache hit the transforms are not re-run, so the applied-transform values
        // (`flip`, `quality`, `rotate`, ...) cannot be reconstructed from the encoded file.
        // Only `format` is restored below.
        metadata = {
          info: {
            width: raw.width,
            height: raw.height,
            autoOriented: raw.autoOrient
          },
          transforms: {
            format: raw.format
          }
        }
        // we set the format on the metadata during transformation using the format directive
        // when restoring from the cache, we use sharp to read it from the image and that can result in a
        // different value: avif images are detected as heif (see https://github.com/lovell/sharp/issues/2504
        // and https://github.com/lovell/sharp/issues/3746) and jpg is detected as jpeg. Restore the directive
        // value so emitted filenames don't change between cache misses and cache hits.
        // `ImageConfig` values are always strings, so a missing `format` is the only
        // `undefined` case; custom `resolveConfigs` overrides must return string values.
        if (imageConfig.format !== undefined && metadata.transforms.format !== imageConfig.format)
          metadata.transforms.format = imageConfig.format
      } else {
        const { transforms } = generateTransforms(imageConfig, transformFactories, srcURL.searchParams, logger)
        const res = await applyTransforms(transforms, img.clone(), pluginOptions.removeMetadata)
        image = res.image
        metadata = res.metadata
        // Transforms report their target dimensions on the metadata, but the encoded image can differ
        // (e.g. `rotate` swaps width and height). Reconcile against the actual output so the metadata
        // and the pixel density descriptors derived from it match the dimensions the cache-hit path
        // reads back from the cached file.
        const { data, info } = await image.toBuffer({ resolveWithObject: true })
        cachedBuffer = data
        metadata.info.width = info.width
        metadata.info.height = info.height
        // Read the metadata from the encoded output so a cache miss reports the
        // same `sharpMetadata` as the cache-hit path reads back from the file.
        raw = await sharp(cachedBuffer).metadata()
        if (cacheOptions.enabled) {
          await writeFileAtomic(`${cacheOptions.dir}/${imageId}`, cachedBuffer)
        }
      }

      const processedMetadata: ProcessedImage = {
        src: '',
        image,
        config: imageConfig,
        info: metadata.info,
        transforms: metadata.transforms,
        sharpMetadata: raw
      }
      generatedImages.set(imageId, processedMetadata)

      if (directives.has('inline')) {
        const inlineBuffer = cachedBuffer || (await image.toBuffer())
        processedMetadata.src = `data:image/${processedMetadata.transforms.format};base64,${inlineBuffer.toString('base64')}`
      } else if (viteConfig.command === 'serve') {
        processedMetadata.src = (viteConfig?.server?.origin ?? '') + basePath + imageId
      } else {
        const fileHandle = ctx.emitFile({
          name: basename(pathname, extname(pathname)) + `.${processedMetadata.transforms.format}`,
          source: cachedBuffer || (await image.toBuffer()),
          type: 'asset',
          originalFileName: normalizePath(relative(viteConfig.root, srcURL.pathname))
        })

        processedMetadata.src = `__VITE_ASSET__${fileHandle}__`
      }

      return processedMetadata
    }

    /** allows only one transform to be run for a given cache id */
    async function synchronizedTransform(imageId: string, imageConfig: ImageConfig) {
      let transformPromise = transformPromises.get(imageId)
      if (transformPromise) return transformPromise

      let resolve!: (v: ProcessedImage) => void
      let reject!: (e: unknown) => void

      transformPromise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })

      transformPromises.set(imageId, transformPromise)

      executeTransform(imageId, imageConfig)
        .then(resolve, reject)
        .finally(() => {
          transformPromises.delete(imageId)
        })

      return transformPromise
    }

    const outputs = await Promise.all(
      imageConfigs.map((config) => {
        const imageId = generateImageID(config, imageHash)
        return synchronizedTransform(imageId, config)
      })
    )

    let outputFormat = urlFormat()
    const asParam = directives.get('as')?.split(':')
    const as = asParam ? asParam[0] : undefined
    for (const [key, format] of Object.entries(outputFormats)) {
      if (as === key) {
        outputFormat = format(asParam && asParam[1] ? asParam[1].split(';') : undefined)
        break
      }
    }

    return dataToEsm(await outputFormat(outputs), {
      namedExports: pluginOptions.namedExports ?? viteConfig.json?.namedExports ?? true,
      compact: !!viteConfig.build.minify,
      preferConst: true
    })
  }

  return {
    name: 'imagetools',
    enforce: 'pre',
    configResolved(cfg) {
      viteConfig = cfg
      basePath = createBasePath(viteConfig.base)
    },
    load: {
      filter: { id: { include: pluginOptions.include, exclude: pluginOptions.exclude } },
      async handler(id) {
        if (!filter(id)) return null

        try {
          return await transformImage(id, this)
        } catch (error) {
          if (error instanceof Error) {
            ;(error as PluginError).id = id
          }
          throw error
        }
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(basePath)) {
          const [, imageId] = req.url.split(basePath)

          const processedImage = generatedImages.get(imageId)

          if (!processedImage)
            throw new Error(`vite-imagetools cannot find image with id "${imageId}" this is likely an internal error`)

          const { image } = processedImage

          if (pluginOptions.removeMetadata === false) {
            image.withMetadata()
          }

          res.setHeader('Content-Type', `image/${processedImage.transforms.format}`)
          return image.clone().pipe(res)
        }

        next()
      })
    },

    async buildEnd(error) {
      if (!error && cacheOptions.enabled && cacheOptions.retention !== undefined && viteConfig.command !== 'serve') {
        const dir = await opendir(cacheOptions.dir)

        for await (const dirent of dir) {
          if (dirent.isFile()) {
            if (generatedImages.has(dirent.name)) continue

            const imagePath = `${cacheOptions.dir}/${dirent.name}`
            const stats = await stat(imagePath)

            if (Date.now() - stats.mtimeMs > cacheOptions.retention * 1000) {
              console.debug(`deleting stale cached image ${dirent.name}`)
              await rm(imagePath)
            }
          }
        }
      }
    }
  }
}
