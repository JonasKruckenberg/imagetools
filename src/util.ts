import { Sharp } from "sharp"
import { Directive, DirectiveContext, DirectiveOptions, ImageTransformation } from "./types"
import { get as cacheGet } from 'cacache'

export const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))

export function buildDirectiveOptions(src: URL): DirectiveOptions[] {
    return Array.from(src.searchParams.entries())
        .map<[string, string[]]>(([key, value]) => [key, value.split(';')])
        .map(([key, values]) => values.map(v => ({ [key]: v })))
        .reduce((prev, cur) => prev.length ? cartesian(prev, cur) : cur, [])
        .map((options: Record<string, any>[]) => Array.isArray(options) ? Object.assign({}, ...options) : options)
}

export function buildTransforms(config: DirectiveOptions, directives: Directive[]) {
    const parametersUsed = new Set()
    const metadata = {}

    const context: DirectiveContext = {
        useParam: (key) => parametersUsed.add(key),
        setMetadata: (key, value) => metadata[key] = value
    }

    const transforms = directives
        .map(dir => dir(config as any, context))
        .filter((transform): transform is ImageTransformation => typeof transform === 'function')

    return { metadata, transforms, parametersUsed }
}

export async function restoreFromCache(id: string, cachePath: string) {
    try {
        return await cacheGet(cachePath, id)
    } catch {
        return { data: null, metadata: null }
    }
}

export function transformImage(image: Sharp, transforms: ImageTransformation[]) {
    return transforms.reduce((image, transform) => transform(image), image)
}