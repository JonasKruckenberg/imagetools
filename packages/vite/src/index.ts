import { basename, extname } from 'node:path'
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
  type ProcessedImageMetadata
} from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import sharp, { type Metadata, type Sharp } from 'sharp'
import { createBasePath, generateImageID } from './utils.js'
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

  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  const transformFactories = pluginOptions.extendTransforms ? pluginOptions.extendTransforms(builtins) : builtins

  const outputFormats: Record<string, OutputFormat> = pluginOptions.extendOutputFormats
    ? pluginOptions.extendOutputFormats(builtinOutputFormats)
    : builtinOutputFormats

  let viteConfig: ResolvedConfig
  let basePath: string

  const generatedImages = new Map<string, Sharp>()

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

      for (const config of imageConfigs) {
        const { transforms } = generateTransforms(config, transformFactories, srcURL.searchParams, logger)
        const { image, metadata } = await applyTransforms(transforms, img.clone(), pluginOptions.removeMetadata)

        if (viteConfig.command === 'serve') {
          const id = await generateImageID(srcURL, config, img)
          generatedImages.set(id, image)
          metadata.src = basePath + id
        } else {
          const fileHandle = this.emitFile({
            name: basename(pathname, extname(pathname)) + `.${metadata.format}`,
            source: await image.toBuffer(),
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
        compact: !!viteConfig.build.minify ?? false,
        preferConst: true
      })
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(basePath)) {
          const [, id] = req.url.split(basePath)

          const image = generatedImages.get(id)

          if (!image)
            throw new Error(`vite-imagetools cannot find image with id "${id}" this is likely an internal error`)

          if (pluginOptions.removeMetadata === false) {
            image.withMetadata()
          }

          res.setHeader('Content-Type', `image/${getMetadata(image, 'format')}`)
          res.setHeader('Cache-Control', 'max-age=360000')
          return image.clone().pipe(res)
        }

        next()
      })
    }
  }
}
