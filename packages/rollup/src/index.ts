import { Plugin } from 'rollup'
import { applyTransforms, builtinTransformFactories, buildTransforms, loadImage, parseURL, resolveTargets, extractEntries, initializeMetadata } from 'imagetools-core'
import { createFilter, dataToEsm } from '@rollup/pluginutils'
import { PluginOptions } from './types'
import MagicString from 'magic-string'
import { resolve, dirname } from 'path'
import { emitFile } from './emit-file'

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
        ? pluginOptions.extendTransforms(builtinTransformFactories)
        : builtinTransformFactories

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
            const parameters = extractEntries(srcURL)
            const targets = resolveTargets(parameters, pluginOptions.defaultDirectives || {})

            const img = await initializeMetadata(
                loadImage(decodeURIComponent(srcURL.pathname)),
                srcURL,
                pluginOptions.removeMetadata
            )

            let outputs: unknown[] = []

            for (const target of targets) {
                const transforms = buildTransforms(transformFactories, target)

                outputs.push(await applyTransforms.call(this, [...transforms, emitFile], img))
            }

            return dataToEsm(outputs)
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