// import * as imagetools from imagetools-core'
import findCacheDir from 'find-cache-dir'
import { basename, extname, join, relative } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { OutputFormat, PluginOptions } from './types'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { builtins, parseURL, generateConfigs, generateTransforms, applyTransforms, cache, loadImageFromDisk } from 'imagetools-core'
import { builtinOutputFormats, urlFormat } from './output-formats'
import MagicString from 'magic-string'

const defaultOptions: PluginOptions = {
    include: '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
    exclude: 'public\/**\/*',
    cache: findCacheDir({ name: 'vite-imagetools' }) || false,
    silent: false
}

export default (userOptions: Partial<PluginOptions> = {}): Plugin => {
    const pluginOptions: PluginOptions = { ...defaultOptions, ...userOptions }

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const directives = pluginOptions.extendDirectives
        ? pluginOptions.extendDirectives(builtins)
        : builtins

    const OutputFormats = pluginOptions.extendOutputFormats
        ? pluginOptions.extendOutputFormats(builtinOutputFormats)
        : builtinOutputFormats

    let viteConfig: ResolvedConfig

    return {
        name: 'imagetools',
        enforce: 'pre',
        configResolved(cfg) {
            viteConfig = cfg
        },
        async load(id) {
            if (!filter(id)) return

            const src = new URL(id, 'file://')
            const parameters = parseURL(new URL(id, 'file://'))

            const imageConfigs = generateConfigs(parameters)

            const generatedImages: Record<string, any>[] = []

            for (const config of imageConfigs) {
                const cacheId = cache.generateKey(src, config)

                let outputMetadata = undefined
                let outputData = undefined

                try {
                    // restore from cache
                    if (!pluginOptions.cache) throw new Error('no cache configured so break to transformation')

                    const { data, metadata } = await cache.get(pluginOptions.cache, cacheId)
                    outputData = data
                    outputMetadata = metadata

                } catch {
                    // generateTransforms
                    const { transforms, metadata, warnings, parametersUsed } = generateTransforms(config, directives)

                    if (!pluginOptions.silent) {
                        warnings.forEach(message => this.warn(message))
                    }

                    const img = loadImageFromDisk(src.pathname)

                    // applyTransforms
                    const { data, info } = await applyTransforms(transforms, img)

                    outputData = data
                    outputMetadata = { ...metadata, ...info }

                    // cache image
                    if (pluginOptions.cache) {
                        await cache.put(pluginOptions.cache, cacheId, data, outputMetadata)
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
                } else if (pluginOptions.cache) {
                    outputMetadata.src = relative(viteConfig.root,join(pluginOptions.cache, cacheId))
                }

                generatedImages.push(outputMetadata)
            }

            let outputFormat: OutputFormat = urlFormat

            for (const [key,format] of Object.entries(OutputFormats)) {
                if(src.searchParams.has(key)) {
                    outputFormat = format
                    break
                }
            }

            return dataToEsm(outputFormat(generatedImages))
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