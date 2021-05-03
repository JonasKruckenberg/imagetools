import { Plugin } from 'rollup'
import { applyTransforms, builtins, generateTransforms, loadImage, parseURL, resolveConfigs, builtinOutputFormats, urlFormat, OutputFormat } from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { PluginOptions } from './types'
import MagicString from 'magic-string'
import { basename, extname, resolve } from 'path'

const defaultOptions: PluginOptions = {
    include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: '',
    silent: false,
    removeMetadata: true
}

export function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
    const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const transformFactories = pluginOptions.extendTransforms
        ? pluginOptions.extendTransforms(builtins)
        : builtins

    const outputFormats = pluginOptions.extendOutputFormats
        ? pluginOptions.extendOutputFormats(builtinOutputFormats)
        : builtinOutputFormats

    return {
        name: 'imagetools',
        resolveId(source) {
            const id = resolve(process.cwd(), source)

            if (!filter(id)) return null
            return id
        },
        async load(id) {
            if (!filter(id)) return null

            const src = new URL(id, 'file://')
            const parameters = parseURL(src)
            const imageConfigs = resolveConfigs(parameters)

            const img = loadImage(decodeURIComponent(src.pathname))

            const outputMetadatas = []

            for (const config of imageConfigs) {
                const defaultConfig = typeof pluginOptions.defaultDirectives === 'function'
                    ? pluginOptions.defaultDirectives(id)
                    : pluginOptions.defaultDirectives

                const { transforms, warnings } = generateTransforms({ ...defaultConfig, ...config }, transformFactories)
                warnings.forEach(warning => this.warn(warning))

                const { image, metadata } = await applyTransforms(transforms, img, pluginOptions.removeMetadata)

                const fileName = basename(src.pathname, extname(src.pathname)) + `.${metadata.format}`

                const fileHandle = this.emitFile({
                    name: fileName,
                    source: await image.toBuffer(),
                    type: 'asset'
                })

                metadata.src = `__ROLLUP_IMAGE_ASSET__${fileHandle}__`

                outputMetadatas.push(metadata)
            }

            let outputFormat: OutputFormat = urlFormat

            for (const [key, format] of Object.entries(outputFormats)) {
                if (src.searchParams.has(key)) {
                    outputFormat = format
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

                s.overwrite(
                    match.index,
                    match.index + full.length,
                    outputFilepath
                )
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