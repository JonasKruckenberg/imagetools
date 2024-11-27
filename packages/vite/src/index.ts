import { basename, extname } from 'node:path'
import { statSync, mkdirSync, createReadStream } from 'node:fs'
import { writeFile, readFile, opendir, stat, rm } from 'node:fs/promises'
import type { Plugin, ResolvedConfig } from 'vite'
import {
  applyTransforms,
  builtins,
  builtinOutputFormats,
  extractEntries,
  generateTransforms,
  getMetadata,
  parseURL,
  urlFormat,
  resolveConfigs,
  type Logger,
  type OutputFormat,
  type ProcessedImageMetadata,
  type ImageMetadata
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

  const generatedImages = new Map<string, { image?: Sharp; metadata: ImageMetadata }>()

  return {
    name: 'imagetools',
    enforce: 'pre',
    configResolved(cfg) {
      viteConfig = cfg
      basePath = createBasePath(viteConfig.base)
    },
    async load(id) {
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
          [...new Set(s.split(';').map((d): string => (parseInt(d) <= intrinsic ? d : intrinsic.toString())))].join(';')

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

      const outputMetadatas: Array<ProcessedImageMetadata> = []

      const logger: Logger = {
        info: (msg) => viteConfig.logger.info(msg),
        warn: (msg) => this.warn(msg),
        error: (msg) => this.error(msg)
      }

      const imageBuffer = await img.clone().toBuffer()

      const imageHash = hash([imageBuffer])
      for (const config of imageConfigs) {
        const id = generateImageID(config, imageHash)
        let image: Sharp | undefined
        let metadata: ImageMetadata

        if (cacheOptions.enabled && (statSync(`${cacheOptions.dir}/${id}`, { throwIfNoEntry: false })?.size ?? 0) > 0) {
          metadata = (await sharp(`${cacheOptions.dir}/${id}`).metadata()) as ImageMetadata
          // we set the format on the metadata during transformation using the format directive
          // when restoring from the cache, we use sharp to read it from the image and that results in a different value for avif images
          // see https://github.com/lovell/sharp/issues/2504 and https://github.com/lovell/sharp/issues/3746
          if (config.format === 'avif' && metadata.format === 'heif' && metadata.compression === 'av1')
            metadata.format = 'avif'
        } else {
          const { transforms } = generateTransforms(config, transformFactories, srcURL.searchParams, logger)
          const res = await applyTransforms(transforms, img, pluginOptions.removeMetadata)
          metadata = res.metadata
          if (cacheOptions.enabled) {
            await writeFile(`${cacheOptions.dir}/${id}`, await res.image.toBuffer())
          } else {
            image = res.image
          }
        }

        generatedImages.set(id, { image, metadata })

        if (directives.has('inline')) {
          metadata.src = `data:image/${metadata.format};base64,${(image
            ? await image.toBuffer()
            : await readFile(`${cacheOptions.dir}/${id}`)
          ).toString('base64')}`
        } else if (viteConfig.command === 'serve') {
          metadata.src = (viteConfig?.server?.origin ?? '') + basePath + id
        } else {
          const fileHandle = this.emitFile({
            name: basename(pathname, extname(pathname)) + `.${metadata.format}`,
            source: image ? await image.toBuffer() : await readFile(`${cacheOptions.dir}/${id}`),
            type: 'asset'
          })

          metadata.src = `__VITE_ASSET__${fileHandle}__`
        }

        metadata.image = image

        outputMetadatas.push(metadata as ProcessedImageMetadata)
      }

      let outputFormat = urlFormat()
      const asParam = directives.get('as')?.split(':')
      const as = asParam ? asParam[0] : undefined
      for (const [key, format] of Object.entries(outputFormats)) {
        if (as === key) {
          outputFormat = format(asParam && asParam[1] ? asParam[1].split(';') : undefined)
          break
        }
      }

      return dataToEsm(await outputFormat(outputMetadatas), {
        namedExports: pluginOptions.namedExports ?? viteConfig.json?.namedExports ?? true,
        compact: !!viteConfig.build.minify,
        preferConst: true
      })
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(basePath)) {
          const [, id] = req.url.split(basePath)

          const { image, metadata } = generatedImages.get(id) ?? {}

          if (!metadata)
            throw new Error(`vite-imagetools cannot find image with id "${id}" this is likely an internal error`)

          if (!image) {
            res.setHeader('Content-Type', `image/${metadata.format}`)
            return createReadStream(`${cacheOptions.dir}/${id}`).pipe(res)
          }

          if (pluginOptions.removeMetadata === false) {
            image.withMetadata()
          }

          res.setHeader('Content-Type', `image/${getMetadata(image, 'format')}`)
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
