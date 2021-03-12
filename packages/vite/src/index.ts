import * as imagetools from 'imagetools-core'
import { get as cacheGet, put as cachePut } from 'cacache'
import findCacheDir from 'find-cache-dir'
import { basename, extname } from 'path'
import { Plugin, ResolvedConfig } from 'vite'
import { PluginOptions } from './types'
import { builtins } from 'imagetools-core'

const defaultOptions: PluginOptions = {
    include: '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public\/**\/*',
    cache: findCacheDir({ name: 'vite-imagetools' }) || false,
    directives: builtins,
    force: false,
    silent: false
}

export default (userOptions: Partial<PluginOptions> = {}): Plugin => {
    const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

    let viteConfig: ResolvedConfig

    return {
        name: 'imagetools',
        configResolved(cfg) {
            viteConfig = cfg
        },
        async load(id) {
            const src = new URL(id, 'file://')
            const parameters = imagetools.parseURL(new URL(id, 'file://'))

            const imageConfigs = imagetools.generateConfigs(parameters)

            const generatedImages = []

            for (const config of imageConfigs) {
                const cacheId = JSON.stringify(config)

                let outputMetadata = undefined
                let outputData = undefined

                try {
                    // restore from cache
                    if(!pluginOptions.cache) throw new Error('no cache configured so break to transformation')

                    const { data, metadata } = await cacheGet(pluginOptions.cache, cacheId)
                    outputData = data
                    outputMetadata = metadata

                } catch {
                    // generateTransforms
                    const { transforms, metadata, warnings, parametersUsed } = imagetools.generateTransforms(config, imagetools.builtins)

                    if (!pluginOptions.silent) {
                        warnings.forEach(message => this.warn(message))
                    }

                    // applyTransforms
                    const { data, info } = await imagetools.applyTransforms(transforms, src)

                    outputData = data
                    outputMetadata = { ...metadata, ...info }

                    // cache image
                    if(pluginOptions.cache) {
                        await cachePut(pluginOptions.cache, cacheId, data, { metadata: outputMetadata })
                    }
                }

                if (viteConfig.command === 'build') {
                    const fileName = basename(src.pathname, extname(src.pathname)) + `.${outputMetadata.format}`

                    const fileHandle = this.emitFile({
                        name: fileName,
                        source: outputData,
                        type: 'asset'
                    })

                    outputMetadata.src = `__VITE_IMAGE_ASSET__${fileHandle}__`
                } else if (pluginOptions.force && pluginOptions.cache) {
                    const { path } = await cacheGet.info(pluginOptions.cache, cacheId)

                    outputMetadata.src = path
                }

                generatedImages.push(outputMetadata)
            }

            console.log(generatedImages);

            return null
        },

        renderChunk() {
            return null
        }
    }
}