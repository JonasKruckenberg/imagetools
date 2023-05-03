import { basename, extname } from 'node:path'
import { Plugin, ResolvedConfig } from 'vite'
import {
  parseURL,
  loadImage,
  builtins,
  resolveConfigs,
  applyTransforms,
  generateTransforms,
  getMetadata,
  generateImageID,
  builtinOutputFormats,
  urlFormat,
  extractEntries,
  ImageConfig,
  Logger,
  OutputFormat
} from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { VitePluginOptions } from './types'
import { createBasePath } from './utils'

const defaultOptions: VitePluginOptions = {
  include: /^[^?]+\.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)(\?.*)?$/,
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

  const generatedImages = new Map()

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

      const defaultDirectives =
        typeof pluginOptions.defaultDirectives === 'function'
          ? pluginOptions.defaultDirectives(srcURL)
          : pluginOptions.defaultDirectives || new URLSearchParams()
      const directives = new URLSearchParams({
        ...Object.fromEntries(defaultDirectives),
        ...Object.fromEntries(srcURL.searchParams)
      })

      if (!directives.toString()) return null

      const img = loadImage(decodeURIComponent(srcURL.pathname))
      if (directives.get('allowUpscale') !== 'true') {
        const metadata = await img.metadata()
        const intrinsicWidth = metadata.width || 0
        const intrinsicHeight = metadata.height || 0

        const widths = (directives.get('w')?.split(';') || []).filter((d) => parseInt(d) > intrinsicWidth).join(';')
        if (widths) {
          directives.set('w', widths)
        }

        const heights = (directives.get('h')?.split(';') || []).filter((d) => parseInt(d) > intrinsicHeight).join(';')
        if (heights) {
          directives.set('h', widths)
        }
      }

      const parameters = extractEntries(directives)
      const imageConfigs =
        pluginOptions.resolveConfigs?.(parameters, outputFormats) ?? resolveConfigs(parameters, outputFormats)

      const outputMetadatas: Array<ImageConfig> = []

      const logger: Logger = {
        info: (msg) => viteConfig.logger.info(msg),
        warn: (msg) => this.warn(msg),
        error: (msg) => this.error(msg)
      }

      for (const config of imageConfigs) {
        const { transforms } = generateTransforms(config, transformFactories, srcURL.searchParams, logger)
        const { image, metadata } = await applyTransforms(transforms, img.clone(), pluginOptions.removeMetadata)

        if (this.meta.watchMode) {
          const id = generateImageID(srcURL, config)
          generatedImages.set(id, image)
          metadata.src = basePath + id
        } else {
          const fileHandle = this.emitFile({
            name: basename(srcURL.pathname, extname(srcURL.pathname)) + `.${metadata.format}`,
            source: await image.toBuffer(),
            type: 'asset'
          })

          metadata.src = `__VITE_ASSET__${fileHandle}__`
        }

        metadata.image = image

        outputMetadatas.push(metadata)
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
        namedExports: viteConfig.json?.namedExports ?? true,
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
