import { AvifOptions, GifOptions, JpegOptions, PngOptions, ResizeOptions, Sharp, TiffOptions, WebpOptions, FormatEnum } from "sharp";
import { Directive } from "./directives";
import pm from 'picomatch'

export interface Options extends ResizeOptions, JpegOptions, WebpOptions, PngOptions, AvifOptions, GifOptions, TiffOptions {
    format: keyof FormatEnum
}

export function buildOptions(url: URL, directives: Directive[]): Options {
    // if a string is passed we assume it is a file
    // if (typeof url === 'string') url = new URL(url, 'file://')

    const requestDirectives = Array.from(url.searchParams.keys())

    const parts = requestDirectives.map(dirName => {
        const arg = url.searchParams.get(dirName)
        const directive = directives.find(dir => dir.test(dirName, arg))

        if (!directive) throw new Error(`unknown directive "${dirName}"`)

        if ('with' in directive) {
            if (!testConditions(directive.with, requestDirectives)) {
                console.log(requestDirectives);

                throw new Error(`Directive "${directive.name}" can only be used when one of ${directive.with.join()} is present`)
            }
        }
        if ('without' in directive) {
            if (testConditions(directive.without, requestDirectives)) {
                throw new Error(`Directive "${directive.name}" cannot be used with ${directive.with.join()}`)
            }
        }

        return directive.transform
            ? directive.transform(dirName, arg)
            : { [dirName]: arg }
    })

    return Object.assign({}, ...parts)
}

export function has(options: Options, ...keys: string[]) {
    return keys.some((key) => key in options)
}

export function testConditions(conditions: string[], keys: string[]) {
    return conditions.some(w => keys.some(key => pm.isMatch(key, w)))
}