import { Plugin, ResolvedConfig } from "vite";
import { parseURL, loadImage, builtins, resolveConfigs, applyTransforms, generateTransforms, getMetadata, generateImageID } from 'imagetools-core'
import { basename, extname, join } from 'path'
import { createFilter, dataToEsm } from "@rollup/pluginutils";
import { builtinOutputFormats, urlFormat } from './output-formats'
import MagicString from 'magic-string'
import { OutputFormat, PluginOptions } from "./types";

const defaultOptions: PluginOptions = {
    include: '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public\/**\/*',
    silent: false,
    removeMetadata: true
}

export default function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
    const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const transformFactories = pluginOptions.extendTransforms
        ? pluginOptions.extendTransforms(builtins)
        : builtins

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

            const src = new URL(id, 'file://')
            const parameters = parseURL(src)
            const imageConfigs = resolveConfigs(parameters)

            const img = loadImage(src.pathname)

            const outputMetadatas = []

            for (const config of imageConfigs) {
                const id = generateImageID(src, config)

                const { transforms } = generateTransforms(config, transformFactories)
                const { image, metadata } = await applyTransforms(transforms, img, pluginOptions.removeMetadata)

                generatedImages.set(id, image)

                if (!this.meta.watchMode) {
                    const fileName = basename(src.pathname, extname(src.pathname)) + `.${metadata.format}`

                    const fileHandle = this.emitFile({
                        name: fileName,
                        source: await image.toBuffer(),
                        type: 'asset'
                    })

                    metadata.src = `__VITE_IMAGE_ASSET__${fileHandle}__`
                } else {
                    metadata.src = join('/@vite-imagetools', id)
                }

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

        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url?.startsWith('/@vite-imagetools/')) {
                    const [, id] = req.url.split('/@vite-imagetools/')

                    const image = generatedImages.get(id)

                    if(pluginOptions.removeMetadata === false) {
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
            const assetUrlQuotedRE = /__VITE_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g

            let match
            let s
            while ((match = assetUrlQuotedRE.exec(code))) {
                s = s || (s = new MagicString(code))
                const [full, hash, postfix = ''] = match

                const file = this.getFileName(hash)

                const outputFilepath = viteConfig.base + file + postfix

                s.overwrite(
                    match.index,
                    match.index + full.length,
                    outputFilepath
                )
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