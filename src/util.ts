import { Sharp } from "sharp"
import { Directive, DirectiveContext, DirectiveOptions, ImageTransformation, MetaDirective } from "./types"
import { get as cacheGet } from 'cacache'

/**
 * This function calculates the cartesian product of two or more array and is straight from stackoverflow ;)
 * Should be replaced with something more legible but works for now.
 * @internal
 */
export const cartesian = (...a: any[]) => a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())))

/**
 * This function extracts all parameters from a given URL and returns them as an array of entries.
 * @param src the url to get the parameter from
 * @returns 
 */
export function extractParameterEntries(src: URL) {
    // generate parameter entries from the url
    // splits at ";" instead of "," because of vues srcset parser
    return Array.from(src.searchParams.entries())
        .map<[string, string[]]>(([key, value]) => [key, value.split(';')])
}

/**
 * This function builds up all possible combinations the given entries can be combined
 * an returns it as an array of objects that can be given to a the directives.
 * @param entries The url parameter entries
 * @returns An array of directive options
 */
export function buildDirectiveOptions(entries: [string, string[]][]) {

    // create a new array of entries for each argument
    const singleArgEntries = entries
        .map(([key, values]) => values.map<[[string, string]]>(v => [[key, v]]))

    // do a cartesian product on all entries to get all combainations we need to produce
    const combinations = singleArgEntries
        .reduce((prev, cur) => prev.length ? cartesian(prev, cur) : cur, [])

    // and return as an array of objects
    return combinations.map((options) => Object.fromEntries(options))
}

/**
 * This method takes a directive options and an array of directives,
 * invoking each directive with the config an evaluating each return.
 * This builds up an array of transformation functions that can then be applied to the Sharp image instance.
 * @param options The directive options
 * @param directives The directives to apply
 * @returns An array of ImageTransforms
 */
export function buildTransforms(options: DirectiveOptions, directives: Array<Directive | MetaDirective>) {
    const parametersUsed = new Set()
    const metadata: Record<string, any> = {}

    const context: DirectiveContext = {
        useParam: (key) => parametersUsed.add(key),
        setMetadata: (key, value) => metadata[key] = value
    }

    const transforms = directives
        .map(dir => dir(options as any, context))
        .filter((transform): transform is ImageTransformation => typeof transform === 'function')

    return { metadata, transforms, parametersUsed }
}

/**
 * This function tries to load a given id from cache and return the data + metadata.
 * If loading fails (i.e. the image is not cached) it will return and empty object.
 * @param id The image cache ID to restore
 * @param cachePath The cache path to restore from
 * @returns The image data and metadata
 */
export async function restoreFromCache(id: string, cachePath: string) {
    try {
        const { data, metadata } = await cacheGet(cachePath, id)
        return { data, metadata }
    } catch {
        return {}
    }
}

export function transformImage(image: Sharp, transforms: ImageTransformation[]) {
    return transforms.reduce((image, transform) => transform(image), image)
}