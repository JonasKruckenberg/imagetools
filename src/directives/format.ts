import { Directive } from "../types"
import { quality as getQuality } from "./quality"

type FormatShorthandOptions = {
    [key in ImageFormat]?: ''
}

interface FormatOptions {
    format: ImageFormat
}

export type ImageFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'


export const format: Directive<FormatOptions | FormatShorthandOptions> = (opts, { useParam, setMetadata }) => {
    const formats: ImageFormat[] = ['avif', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'heif', 'heic', 'gif']

    const format = formats.includes(opts.format) ? opts.format : formats.find(f => f in opts && opts[f] === '')

    if (!format) return null

    const quality = getQuality(opts, { useParam, setMetadata }) || undefined

    // if the format came from ctx.format mark it as used
    if (opts.format) {
        useParam('format')
    } else {
        // otherwise mark the shorthand as used
        useParam(format)
    }

    setMetadata('format', format)

    return function formatTransform(image) {
        return image.toFormat(format, { quality })
    }
}