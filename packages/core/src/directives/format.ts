import { Directive } from "../types";
import { quality as getQuality } from './quality'

export const formatValues = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff'] as const

export type FormatValue = typeof formatValues[number]

export interface FormatOptions {
    format: FormatValue
}

export const format: Directive<FormatOptions> = (config, ctx) => {
    let format: FormatValue | undefined = undefined

    if (config.format && formatValues.includes(config.format)) {
        format = config.format
    } else {
        format = Object.keys(config).find((k: any): k is FormatValue => formatValues.includes(k) && config[k] === '')
    }
    if (!format) return

    const quality = getQuality(config, ctx)

    return function formatTransform(image) {
        //@ts-ignore
        return image.toFormat(format, { quality })
    }
}