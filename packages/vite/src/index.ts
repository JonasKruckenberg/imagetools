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
  Logger
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

  const outputFormats = pluginOptions.extendOutputFormats
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

      let directives = srcURL.searchParams

      if (typeof pluginOptions.defaultDirectives === 'function') {
        directives = new URLSearchParams([...pluginOptions.defaultDirectives(srcURL), ...srcURL.searchParams])
      } else if (pluginOptions.defaultDirectives) {
        directives = new URLSearchParams([...pluginOptions.defaultDirectives, ...srcURL.searchParams])
      }

      if (!directives.toString()) return null

      const parameters = extractEntries(directives)
      const imageConfigs =
        pluginOptions.resolveConfigs?.(parameters, outputFormats) ?? resolveConfigs(parameters, outputFormats)

      const img = loadImage(decodeURIComponent(srcURL.pathname))

      const outputMetadatas = []

      const logger: Logger = {
        info: (msg) => viteConfig.logger.info(msg),
        warn: (msg) => this.warn(msg),
        error: (msg) => this.error(msg)
      }

      for (const config of imageConfigs) {
        const id = generateImageID(srcURL, config)

        const { transforms } = generateTransforms(config, transformFactories, logger)
        const { image, metadata } = await applyTransforms(transforms, img.clone(), pluginOptions.removeMetadata)

        generatedImages.set(id, image)

        if (!this.meta.watchMode) {
          const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.${metadata.format}`

          const fileHandle = this.emitFile({
            name: fileName,
            source: await image.toBuffer(),
            type: 'asset'
          })

          metadata.src = `__VITE_ASSET__${fileHandle}__`
        } else {
          metadata.src = basePath + id
        }

        metadata.image = image

        outputMetadatas.push(metadata)
      }

      let outputFormat = urlFormat()

      for (const [key, format] of Object.entries(outputFormats)) {
        if (directives.has(key)) {
          const params = directives
            .get(key)
            ?.split(';')
            .filter((v: string) => !!v)
          outputFormat = format(params?.length ? params : undefined)
          break
        }
      }

      return dataToEsm(outputFormat(outputMetadatas), {
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
