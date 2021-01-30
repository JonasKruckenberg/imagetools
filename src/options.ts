import { AvifOptions, GifOptions, JpegOptions, PngOptions, ResizeOptions, Sharp, TiffOptions, WebpOptions, FormatEnum } from "sharp";
import { Directive } from "./directives";

export interface Options extends ResizeOptions, JpegOptions, WebpOptions, PngOptions, AvifOptions, GifOptions, TiffOptions {
    format: keyof FormatEnum
}

export function buildOptions(url: URL, directives: Directive[]): Options {
    const parts = Array.from(url.searchParams.entries()).map(([dirName, argument]) => {
        const directive = directives.find(dir => dir.test(dirName, argument))

        if (!directive) throw new Error('unknown directive ' + dirName)
        return directive.transform
            ? directive.transform(dirName, argument)
            : { [dirName]: argument }
    })
    return Object.assign({}, ...parts)
}

export function has(options: Options, ...keys: string[]) {
    return keys.some((key) => key in options)
}