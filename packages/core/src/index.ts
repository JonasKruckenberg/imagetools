import { cartesian } from './util'
import { Sharp } from 'sharp';
import { Directive, DirectiveContext, ImageConfig, ImageTransformation } from "./types";

export * from './directives/background'
export * from './directives/blur'
export * from './directives/fit'
export * from './directives/flatten'
export * from './directives/flip'
export * from './directives/flop'
export * from './directives/format'
export * from './directives/grayscale'
export * from './directives/hsb'
export * from './directives/invert'
export * from './directives/kernel'
export * from './directives/median'
export * from './directives/normalize'
export * from './directives/position'
export * from './directives/progressive'
export * from './directives/quality'
export * from './directives/resize'
export * from './directives/rotate'
export * from './directives/tint'

export * from './builtins'
export * as cache from './cache'
export { loadImageFromDisk, loadImageFromBuffer } from './util'
export * from './types'

export function parseURL(url: URL) {
    const entries: Array<[string, string[]]> = []

    for (const [key, value] of url.searchParams) {
        entries.push([key, value.split(';')])
    }

    return entries
}

/**
 * This function builds up all possible combinations the given entries can be combined
 * an returns it as an array of objects that can be given to a the directives.
 * @param entries The url parameter entries
 * @returns An array of directive options
 */
 export function generateConfigs(entries: Array<[string,string[]]>) {

    // create a new array of entries for each argument
    const singleArgumentEntries = entries
        .map(([key, values]) => values.map<[[string, string]]>(v => [[key, v]]))

    // // do a cartesian product on all entries to get all combainations we need to produce
    const combinations = singleArgumentEntries
        .reduce((prev, cur) => prev.length ? cartesian(prev, cur) : cur, [])

    // // and return as an array of objects
    return combinations.map((options) => Object.fromEntries(options))
}


export function generateTransforms(config: ImageConfig, directives: Record<string, Directive>) {
    const transforms: ImageTransformation[] = []
    const metadata: Record<string, any> = {}
    const parametersUsed = new Set<string>()
    const warnings = new Set<{ directive: string, message: string }>()

    for (const [name, directive] of Object.entries(directives)) {
        const context: DirectiveContext = {
            useParam: k => parametersUsed.add(k),
            addMetadata: (k, v) => metadata[k] = v,
            warn: m => warnings.add({ directive: name, message: m })
        }

        const transform = directive(config, context)

        if (typeof transform === 'function') transforms.push(transform)
    }

    return {
        transforms,
        metadata,
        parametersUsed,
        warnings
    }
}

interface TransformResult {
    data: Uint8Array
    info: Record<string, any>
}

export async function applyTransforms(transforms: ImageTransformation[], image: Sharp): Promise<TransformResult> {
    // let image = sharp(src.pathname)

    image = transforms.reduce((img, transform) => transform(img), image)

    return new Promise((resolve, reject) => {
        image.toBuffer((err, data, info) => {
            if (err) reject(err)

            resolve({
                data,
                info
            })
        })
    })
}