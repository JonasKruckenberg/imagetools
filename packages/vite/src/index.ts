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
  extractEntries
} from 'imagetools-core'
import { basename, extname, join } from 'path'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import MagicString from 'magic-string'
import { PluginOptions } from './types'

const defaultOptions: PluginOptions = {
  include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
  exclude: 'public/**/*',
  silent: false,
  removeMetadata: true
}

export function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
  const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  const transformFactories = pluginOptions.extendTransforms ? pluginOptions.extendTransforms(builtins) : builtins

  const outputFormats = pluginOptions.extendOutputFormats
    ? pluginOptions.extendOutputFormats(builtinOutputFormats)
    : builtinOutputFormats

  let viteConfig: ResolvedConfig

  const generatedImages = new Map()

  return {
    name: 'imagetools',
    enforce: 'pre',
    configResolved(cfg) {
      viteConfig = cfg
    },
    async load(id) {
      if (!filter(id)) return null

      const srcURL = parseURL(id)
      const parameters = extractEntries(srcURL)
      const imageConfigs = pluginOptions.resolveConfigs?.(parameters, outputFormats) || resolveConfigs(parameters, outputFormats)

      const img = loadImage(decodeURIComponent(srcURL.pathname))

      const outputMetadatas = []

      for (const config of imageConfigs) {
        const id = generateImageID(srcURL, config)

        const defaultConfig =
          typeof pluginOptions.defaultDirectives === 'function'
            ? pluginOptions.defaultDirectives(id)
            : pluginOptions.defaultDirectives

        const { transforms } = generateTransforms({ ...defaultConfig, ...config }, transformFactories)
        const { image, metadata } = await applyTransforms(transforms, img, pluginOptions.removeMetadata)

        generatedImages.set(id, image)

        if (!this.meta.watchMode) {
          const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.${metadata.format}`

          const fileHandle = this.emitFile({
            name: fileName,
            source: await image.toBuffer(),
            type: 'asset'
          })

          metadata.src = `__VITE_IMAGE_ASSET__${fileHandle}__`
        } else {
          metadata.src = join('/@imagetools', id)
        }

        metadata.image = image

        outputMetadatas.push(metadata)
      }

      let outputFormat = urlFormat()

      for (const [key, format] of Object.entries(outputFormats)) {
        if (srcURL.searchParams.has(key)) {
          const params = srcURL.searchParams
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
        if (req.url?.startsWith('/@imagetools/')) {
          const [, id] = req.url.split('/@imagetools/')

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
    },

    renderChunk(code) {
      const assetUrlRE = /__VITE_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g

      let match
      let s
      while ((match = assetUrlRE.exec(code))) {
        s = s || (s = new MagicString(code))
        const [full, hash, postfix = ''] = match

        const file = this.getFileName(hash)

        const outputFilepath = viteConfig.base + file + postfix

        s.overwrite(match.index, match.index + full.length, outputFilepath)
      }

      if (s) {
        return {
          code: s.toString(),
          map: viteConfig.build.sourcemap ? s.generateMap({ hires: true }) : null
        }
      } else {
        return null
      }
    }
  }
}
