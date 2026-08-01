import { basename, extname } from 'node:path'
import { relative } from 'node:path/posix'
import { statSync, mkdirSync, createReadStream } from 'node:fs'
import { readFile, writeFile, opendir, stat, rm } from 'node:fs/promises'
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
import { createBasePath, generateImageID, hash } from './utils.js'
import type { VitePluginOptions } from './types.js'

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
          const clamp = (s: string, intrinsic: number) =>
            [...new Set(s.split(';').map((d): string => (parseInt(d) <= intrinsic ? d : intrinsic.toString())))].join(
              ';'
            )

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
          warn: (msg) => this.warn(msg),
          error: (msg) => this.error(msg)
        }

        const imageHash = hash([await img.toBuffer()])

        const executeTransform = async (id: string, imageConfig: ImageConfig) => {
          let image: Sharp | undefined
          let metadata: ImageMetadata
          let raw: Metadata
          let cachedBuffer: Buffer | undefined

          if (
            cacheOptions.enabled &&
            (statSync(`${cacheOptions.dir}/${id}`, { throwIfNoEntry: false })?.size ?? 0) > 0
          ) {
            cachedBuffer = await readFile(`${cacheOptions.dir}/${id}`)
            image = sharp(cachedBuffer)
            raw = await image.metadata()
            // On a cache hit the transforms are not re-run, so the applied-transform values
            // (`flip`, `quality`, `rotate`, ...) cannot be reconstructed from the encoded file.
            // Only `format` is restored below.
            metadata = {
              info: {
                width: raw.width,
                height: raw.height,
                autoOrient: raw.autoOrient
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
            if (typeof imageConfig.format === 'string' && metadata.transforms.format !== imageConfig.format)
              metadata.transforms.format = imageConfig.format
          } else {
            const { transforms } = generateTransforms(imageConfig, transformFactories, srcURL.searchParams, logger)
            const res = await applyTransforms(transforms, img.clone(), pluginOptions.removeMetadata)
            image = res.image
            metadata = res.metadata
            raw = res.raw
            // Transforms report their target dimensions on the metadata, but the encoded image can differ
            // (e.g. `rotate` swaps width and height). Reconcile against the actual output so the metadata
            // and the pixel density descriptors derived from it match the dimensions the cache-hit path
            // reads back from the cached file.
            const { data, info } = await image.toBuffer({ resolveWithObject: true })
            cachedBuffer = data
            metadata.info.width = info.width
            metadata.info.height = info.height
            if (cacheOptions.enabled) {
              await writeFile(`${cacheOptions.dir}/${id}`, cachedBuffer)
            }
          }

          const processedMetadata: ProcessedImage = {
            src: '',
            image,
            config: imageConfig,
            info: metadata.info,
            transforms: metadata.transforms,
            raw
          }
          generatedImages.set(id, processedMetadata)

          if (directives.has('inline')) {
            const inlineBuffer = cachedBuffer || (await image.toBuffer())
            processedMetadata.src = `data:image/${processedMetadata.transforms.format};base64,${inlineBuffer.toString('base64')}`
          } else if (viteConfig.command === 'serve') {
            processedMetadata.src = (viteConfig?.server?.origin ?? '') + basePath + id
          } else {
            const fileHandle = this.emitFile({
              name: basename(pathname, extname(pathname)) + `.${processedMetadata.transforms.format}`,
              source: cachedBuffer || (await image.toBuffer()),
              type: 'asset',
              originalFileName: normalizePath(relative(viteConfig.root, srcURL.pathname))
            })

            processedMetadata.src = `__VITE_ASSET__${fileHandle}__`
          }

          return processedMetadata
        }

        /** allows only one transform to be run for a given id */
        async function synchronizedTransform(id: string, imageConfig: ImageConfig) {
          let transformPromise = transformPromises.get(id)
          if (transformPromise) return transformPromise

          let resolve!: (v: ProcessedImage) => void
          let reject!: (e: unknown) => void

          transformPromise = new Promise((res, rej) => {
            resolve = res
            reject = rej
          })

          transformPromises.set(id, transformPromise)

          executeTransform(id, imageConfig)
            .then(resolve, reject)
            .finally(() => {
              transformPromises.delete(id)
            })

          return transformPromise
        }

        const outputs = await Promise.all(
          imageConfigs.map((config) => {
            const id = generateImageID(config, imageHash)
            return synchronizedTransform(id, config)
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
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(basePath)) {
          const [, id] = req.url.split(basePath)

          const processedImage = generatedImages.get(id)

          if (!processedImage)
            throw new Error(`vite-imagetools cannot find image with id "${id}" this is likely an internal error`)

          const { image } = processedImage

          if (!image) {
            res.setHeader('Content-Type', `image/${processedImage.transforms.format}`)
            return createReadStream(`${cacheOptions.dir}/${id}`).pipe(res)
          }

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
