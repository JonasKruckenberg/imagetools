import { DirectiveOptions } from "./types"

export const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))

export function buildDirectiveOptions(src: URL): DirectiveOptions[] {
    return Array.from(src.searchParams.entries())
        .map<[string, string[]]>(([key, value]) => [key, value.split(',')])
        .map(([key, values]) => values.map(v => ({ [key]: v })))
        .reduce((prev, cur) => prev.length ? cartesian(prev, cur) : cur, [])
        .map((options: Record<string, any>[]) => Array.isArray(options) ? Object.assign({}, ...options) : options)
}