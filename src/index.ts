import sharp from 'sharp'
import { buildOptions, has, Options } from "./options"
import { directives } from './directives'
import { createHash } from 'crypto'
import path from 'path'
import { promises as fs } from 'fs'
import { dataToEsm, createFilter } from "rollup-pluginutils"

interface pluginOptions {
    include?: Array<string | RegExp> | string | RegExp
    exclude?: Array<string | RegExp> | string | RegExp
}

const defaultOptions: pluginOptions = {
    include: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.webp', '**/*.avif', '**/*.gif', '**/*.heif'],
    exclude: ['public/**/*']
}

export default function (userOptions: pluginOptions = {}) {
    const pluginOptions = { ...defaultOptions, ...userOptions }

    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    const CACHE_DIR = './node_modules/.cache/vite-plugin-imageset'

    let globalConfig

    return {
        name: 'imageset',
        enforce: 'pre' as 'pre',
        async buildStart() {
            await fs.mkdir(CACHE_DIR, { recursive: true })
        },
        configResolved(config) {
            globalConfig = config
        },
        async load(assetPath: string) {
            const url = new URL(assetPath, 'file://')

            if (!filter(url.pathname)) {
                return null
            } else {
                const options = buildOptions(url, directives())
                const id = generateId(assetPath)
                const ext = options.format ? `.${options.format}` : path.extname(url.pathname)
                const cachePath = path.join(CACHE_DIR, id + ext)

                if (globalConfig.command === 'serve') {
                    if (!(await isCached(cachePath))) {
                        const content = await transformImage(url, options)
                        await fs.writeFile(cachePath, content)
                    }

                    return dataToEsm('/' + path.relative(globalConfig.root, cachePath), globalConfig.build.rollupOptions)
                } else {
                    let content: Uint8Array
                    if (await isCached(cachePath)) {
                        content = await fs.readFile(cachePath)
                    } else {
                        content = await transformImage(url, options)
                        await fs.writeFile(cachePath, content)
                    }

                    const file = url.pathname

                    const fileHandle = this.emitFile({
                        name: `${path.basename(file, path.extname(file))}${ext}`,
                        type: 'asset',
                        source: content
                    })

                    return dataToEsm(`__VITE_ASSET__${fileHandle}__`, globalConfig.build.rollupOptions)
                }

            }
        }
    }
}

async function isCached(path: string) {
    try {
        const stat = await fs.stat(path)
        return stat.isFile()
    } catch {
        return false
    }

}

function transformImage(url: URL, options: Options) {
    let pipeline = sharp(url.pathname)

    if (has(options, 'size', 'width', 'height')) {
        pipeline = pipeline.resize(options)
    }
    if (has(options, 'format')) {
        pipeline = pipeline.toFormat(options.format)
    }

    return pipeline.toBuffer()
}

function generateId(id: string) {
    return createHash('sha1').update(id).digest('hex').slice(0, 16)
}