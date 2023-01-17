import { Plugin } from 'rollup'
import {
  applyTransforms,
  builtins,
  generateTransforms,
  loadImage,
  parseURL,
  resolveConfigs,
  builtinOutputFormats,
  urlFormat,
  extractEntries
} from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { RollupPluginOptions } from './types'
import MagicString from 'magic-string'
import { basename, extname, resolve, dirname } from 'path'

const defaultOptions: RollupPluginOptions = {
  include: ['**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}', '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'],
  exclude: '',
  silent: false,
  removeMetadata: true
}

export * from 'imagetools-core'

export function imagetools(userOptions: Partial<RollupPluginOptions> = {}): Plugin {
  const pluginOptions: RollupPluginOptions = { ...defaultOptions, ...userOptions }

  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  const transformFactories = pluginOptions.extendTransforms ? pluginOptions.extendTransforms(builtins) : builtins

  const outputFormats = pluginOptions.extendOutputFormats
    ? pluginOptions.extendOutputFormats(builtinOutputFormats)
    : builtinOutputFormats

  return {
    name: 'imagetools',
    resolveId(source, importer = '') {
      const id = resolve(dirname(importer), source)

      if (!filter(id)) return null
      return id
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

      for (const config of imageConfigs) {
        const { transforms, warnings } = generateTransforms(config, transformFactories)
        warnings.forEach((warning) => this.warn(warning))

        const { image, metadata } = await applyTransforms(transforms, img, pluginOptions.removeMetadata)

        const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.${metadata.format}`

        const fileHandle = this.emitFile({
          name: fileName,
          source: await image.toBuffer(),
          type: 'asset'
        })

        metadata.src = `__ROLLUP_IMAGE_ASSET__${fileHandle}__`
        metadata.image = image

        outputMetadatas.push(metadata)
      }

      let outputFormat = urlFormat()

      for (const [key, format] of Object.entries(outputFormats)) {
        if (directives.has(key)) {
          const params = directives
            .get(key)
            ?.split(';')
            .filter((v) => !!v)
          outputFormat = format(params?.length ? params : undefined)
          break
        }
      }

      return dataToEsm(outputFormat(outputMetadatas))
    },
    renderChunk(code) {
      const assetUrlRE = /__ROLLUP_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g

      let match
      let s
      while ((match = assetUrlRE.exec(code))) {
        s = s || (s = new MagicString(code))
        const [full, hash, postfix = ''] = match

        const file = this.getFileName(hash)

        const outputFilepath = file + postfix

        s.overwrite(match.index, match.index + full.length, outputFilepath)
      }

      if (s) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true })
        }
      } else {
        return null
      }
    }
  }
}
