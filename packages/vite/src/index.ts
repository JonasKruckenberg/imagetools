import { Plugin, ResolvedConfig } from "vite";
import { parseURL, loadImage, builtinTransformFactories, resolveTargets, applyTransforms, buildTransforms, extractEntries, initializeMetadata, AFTER_EMIT, generateImageID, getMetadata } from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils';
import MagicString from 'magic-string'
import { PluginOptions } from './types';
import { createEmitFile } from './emit-file'

const defaultOptions: PluginOptions = {
    include: '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public\/**\/*',
    silent: false,
    removeMetadata: true
}

export function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
    const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const transformFactories = pluginOptions.extendTransforms
        ? pluginOptions.extendTransforms(builtinTransformFactories)
        : builtinTransformFactories

    const imageTransformFactories = transformFactories.filter(f => !f[AFTER_EMIT])
    const outputTransformFactories = transformFactories.filter(f => f[AFTER_EMIT])

    let viteConfig: ResolvedConfig
    const cache = new Map<string, any>()

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
            const targets = resolveTargets(parameters, pluginOptions.defaultDirectives || {})

            const img = await initializeMetadata(
                loadImage(decodeURIComponent(srcURL.pathname)),
                srcURL,
                pluginOptions.removeMetadata
            )

            const outputs: unknown[] = []

            for (const target of targets) {
                const cacheId = generateImageID(srcURL, target)
                const transforms = buildTransforms.call(this, [...imageTransformFactories, createEmitFile(cacheId), ...outputTransformFactories], target)

                const [output, image] = await applyTransforms.call(this, transforms, img) || []
                outputs.push(output)
                cache.set(cacheId, image)
            }

            return {
                //@ts-ignore
                code: dataToEsm(outputs.length > 1 ? outputs : outputs[0], {
                    namedExports: viteConfig.json?.namedExports ?? true,
                    compact: !!viteConfig.build.minify ?? false,
                    preferConst: true
                }),
                meta: { imagetools: outputs }
            }
        },

        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                console.log(req.url);
                
                if (req.url?.startsWith('/@imagetools:')) {
                    const [, id] = req.url.split('/@imagetools:')
                    const image = cache.get(id)
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