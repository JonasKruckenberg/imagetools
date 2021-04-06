import { Plugin } from 'rollup'
import { applyTransforms, builtins, generateTransforms, loadImage, parseURL, resolveConfigs, builtinOutputFormats, urlFormat, OutputFormat } from 'imagetools-core'
import { createFilter, dataToEsm } from "@rollup/pluginutils";
import { PluginOptions } from "./types";
import { basename, extname, join } from 'path'

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
            const id = join(process.cwd(), source)

            if (!filter(id)) return null
            return id
        },
        async load(id) {
            if (!filter(id)) return null

            const src = new URL(id, 'file://')
            const parameters = parseURL(src)
            const imageConfigs = resolveConfigs(parameters)

            const img = loadImage(src.pathname)

            const outputMetadatas = []

            for (const config of imageConfigs) {
                const { transforms, warnings } = generateTransforms(config, transformFactories)
                warnings.forEach(warning => this.warn(warning))
                
                const { image, metadata } = await applyTransforms(transforms, img, pluginOptions.removeMetadata)

                const fileName = basename(src.pathname, extname(src.pathname)) + `.${metadata.format}`

                const fileHandle = this.emitFile({
                    name: fileName,
                    source: await image.toBuffer(),
                    type: 'asset'
                })

                metadata.src = `__VITE_IMAGE_ASSET__${fileHandle}__`

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
        }
    }
}