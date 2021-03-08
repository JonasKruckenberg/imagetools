import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { Plugin, ResolvedConfig } from 'vite'
import { put as cachePut } from 'cacache'
import findCacheDir from 'find-cache-dir'
import { basename, extname } from 'path'

import * as builtinDiretcives from './directives'
import * as builtinOutputFormats from './output'
import { buildDirectiveOptions, buildTransforms, restoreFromCache, transformImage } from './util'
import { PluginOptions } from './types'

const defaultOptions: PluginOptions = {
    include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public/**/*',
    cache: findCacheDir({ name: 'vite-imagetools' }),
    customDirectives: [],
    customOutputFormats: []
}

export default function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
    const pluginOptions = { ...defaultOptions, ...userOptions }


    const directives = [...Object.values(builtinDiretcives), ...pluginOptions.customDirectives]

    const outputFormats = [...Object.values(builtinOutputFormats), ...pluginOptions.customOutputFormats]

    return {
        name: 'imagetools',
        enforce: 'pre',
        async load(id) {
            const src = new URL(id, 'file://')

            if (!filter(src.href)) return null

            const pipelineConfigs = buildDirectiveOptions(src)

            const outputMetadatas = await Promise.all(pipelineConfigs.map(async config => {
                const cacheId = JSON.stringify(config) // each image is addressed by its configuration
                let data, metadata

                // Only try to load from cache when caching is enabled
                if (pluginOptions.cache) {
                    const res = await restoreFromCache(cacheId, pluginOptions.cache)
                    data = res.data
                    metadata = res.metadata
                }

                if (!data) {
                    // build the transformation pipeline
                    const { transforms, metadata: _metadata, parametersUsed } = buildTransforms(config, directives)

                    metadata = { src: src.pathname, ..._metadata }

                    console.log(transforms,metadata);

                    if (!this.meta.watchMode) {
                        // transform the image
                        const image = transformImage(sharp(src.pathname), transforms)

                        data = await image.toBuffer()

                        // assign the metadata
                        metadata = Object.assign({}, await image.metadata(), metadata)

                        delete metadata.xmp

                        // if caching is enabled cache the result for future builds
                        if (pluginOptions.cache) await cachePut(pluginOptions.cache, cacheId, data, { metadata })
                    }
                }

                if(!this.meta.watchMode) {
                    // emit the file
                    const file = src.pathname

                    const fileHandle = this.emitFile({
                        name: `${basename(file, extname(file))}.${metadata.format}`,
                        type: 'asset',
                        source: data
                    })

                    // adjust the src atrribute
                    metadata.src = `__VITE_ASSET__${fileHandle}__`
                }

                return metadata
            }))

            // go through all output formats to find the one to use
            const output = outputFormats
                .map(f => f(src, outputMetadatas))
                .find(res => !!res)

            return dataToEsm(output)
        }
    }
}

function buildTransforms(config: DirectiveOptions, directives:Record<string,Directive>) {
    const parametersUsed = new Set()
    const metadata = {}

    const context: DirectiveContext = {
        useParam: (key) => parametersUsed.add(key),
        setMetadata: (key, value) => metadata[key] = value
    }

    const transforms = Object.values(directives)
        .map(dir => dir(config as any, context))
        .filter(transform => typeof transform === 'function')

    return { metadata, transforms, parametersUsed }
}

async function restoreFromCache(id: string, cachePath: string) {
    let res
    try {
        res = await cacheGet(options.cache, id)
    } catch {
        res = {}
    }
    return res
}

function transformImage(image: Sharp, transforms: ImageTransformation[]) {
    return transforms.reduce((image, transform) => transform(image), image)
}

// try {
//     const { data, metadata } = await cacheGet(options.cache, id)
//     outputData = data
//     outputMetadata = metadata
// } catch {
//     const { transforms, metadata, usedParameters } = buildTransforms(config)

//     if (!this.meta.watchMode) {
//         const image = sharp(src.pathname)

//         outputMetadata = Object.assign({ src: src.pathname }, metadata, await image.metadata())

//         outputMetadata.xmp = null

//         outputData = await (await transformImage(image, transforms)).toBuffer()

//         await cachePut(
//             options.cache,
//             id,
//             outputData,
//             {
//                 metadata: outputMetadata
//             }
//         )
//     }
// }