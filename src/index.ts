import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { Plugin, ResolvedConfig } from 'vite'
import { put as cachePut, tmp, ls as listCache, rm as removeFromCache } from 'cacache'
import fs from 'fs/promises'
import { join, relative } from 'path'
import findCacheDir from 'find-cache-dir'
import { basename, extname } from 'path'
import MagicString from 'magic-string'
import sharp from 'sharp'

import * as builtinDiretcives from './directives'
import * as builtinOutputFormats from './output'
import {
    buildDirectiveOptions,
    buildTransforms,
    parseURL,
    applyTransforms,
    imageToBuffer,
    restoreFromCache
} from './util'
import { PluginOptions } from './types'

export * from './directives'
export * from './output'

const defaultOptions: PluginOptions = {
    include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public/**/*',
    cache: findCacheDir({ name: 'vite-imagetools' }) || false,
    customDirectives: [],
    customOutputFormats: [],
    force: false,
    silent: false
}

const assetUrlQuotedRE = /__VITE_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g

export function imagetools(userOptions: Partial<PluginOptions> = {}): Plugin {
    const pluginOptions = { ...defaultOptions, ...userOptions }

    let viteConfig: ResolvedConfig

    // wether to actually transform the images, disabled in devmode by default
    let transformImages: boolean

    // this set keeps track of all cacheId we have used during the build
    let totalImages = new Set()

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const directives = [...pluginOptions.customDirectives, ...Object.values(builtinDiretcives)]

    const outputFormats = [...pluginOptions.customOutputFormats, builtinOutputFormats.metadataFormat, builtinOutputFormats.srcsetFormat]

    return {
        name: 'imagetools',
        enforce: 'pre',
        configResolved(cfg) {
            viteConfig = cfg
            transformImages = cfg.command === 'build' || pluginOptions.force
        },
        async load(id) {
            const src = new URL(id, 'file://')

            if (!filter(src.href)) return null

            // get all parameters from the url query string
            const parameters = parseURL(src)

            // generate configurations for all resulting images
            const pipelineConfigs = buildDirectiveOptions(parameters)


            const outputMetadatas = await Promise.all(pipelineConfigs.map(async config => {
                const cacheId = JSON.stringify(config) + src.href // each image is addressed by its configuration                

                totalImages.add(cacheId)

                let data: Uint8Array | undefined
                let metadata: Record<string, any> = {}

                // Only try to load from cache when caching is enabled
                if (pluginOptions.cache) {
                    const res = await restoreFromCache(cacheId, pluginOptions.cache)
                    data = res.data
                    metadata = res.metadata
                }

                // If the image could not be found in the cache we have to transform it
                if (!data) {
                    // build the transformation pipeline
                    const { transforms, metadata: _metadata, parametersUsed } = buildTransforms(config, directives)

                    const unusedParams = Array.from(src.searchParams.keys())
                        .filter(key => !parametersUsed.has(key) && !['meta', 'metadata', 'srcset'].includes(key))

                    if (!pluginOptions.silent) {
                        for (const key of unusedParams) {
                            this.warn(`Unknown directive "${key}" found!`)
                        }
                    }

                    metadata = { src: src.pathname, ..._metadata }

                    // only apply the actual transformtions in build mode
                    if (transformImages) {
                        const image = applyTransforms(sharp(src.pathname), transforms)

                        const res = await imageToBuffer(image)

                        data = res.data
                        metadata = { ...res.metadata, ...metadata }

                        // if caching is enabled cache the result for future builds
                        if (pluginOptions.cache) await cachePut(pluginOptions.cache, cacheId, data, { metadata })
                    }
                }

                const fileName = basename(src.pathname, extname(src.pathname))

                if (viteConfig.command === 'build') {
                    const fileHandle = this.emitFile({
                        name: `${fileName}.${metadata.format}`,
                        type: 'asset',
                        source: data
                    })

                    // set the src attribute so that vite can replace it with the generated path
                    metadata.src = `__VITE_IMAGE_ASSET__${fileHandle}__`

                } else if (transformImages && pluginOptions.cache) {
                    const dir = await tmp.mkdir(pluginOptions.cache)
                    const tmpFile = join(dir, `${fileName}.${metadata.format}`)

                    await fs.writeFile(tmpFile, data || '')

                    metadata.src = relative(viteConfig.root, tmpFile)
                }

                return metadata
            }))

            // go through all output formats to find the one to use
            const output = outputFormats
                .map(f => f(src, outputMetadatas))
                .find(res => !!res) || builtinOutputFormats.urlFormat(src, outputMetadatas)

            // output as JSON or esm depending on the vite config 
            return viteConfig.json?.stringify
                ? `export default = JSON.parse(${JSON.stringify(JSON.stringify(output))})`
                : dataToEsm(output, {
                    namedExports: !!viteConfig.json?.namedExports,
                    compact: !!viteConfig.build?.minify
                })
        },
        renderChunk(code) {
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
        },
        // cleanup the cache on build end
        async buildEnd() {
            if (pluginOptions.cache) {
                const cachedImages = await listCache(pluginOptions.cache)

                // we will delete all images that are in the cache that have not been referenced during the current build.
                // This means that the image is likely not needed anymore
                for (const key in cachedImages) {
                    if (!totalImages.has(key)) {
                        await removeFromCache(pluginOptions.cache, key)
                        //console.log(`deleted image ${key} from cache`);
                    }
                }
            }
        }
    }
}