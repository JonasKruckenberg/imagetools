import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";
import { getQuality } from './quality'
import { getProgressive } from './progressive'

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


    return function formatTransform(image) {
        setMetadata(image, 'format', format)

        //@ts-ignore
        return image.toFormat(format, {
            quality: getQuality(config, image),
            progressive: getProgressive(config, image)
        })
    }
}