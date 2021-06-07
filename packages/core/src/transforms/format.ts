import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";
import { getQuality } from './quality'
import { getProgressive } from './progressive'

export const formatValues = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff'] as const

export type FormatValue = typeof formatValues[number]

export const format: ImageTransformFactory<'format'> = ({ format, ...rest }) => {
    format ||= Object.keys(rest).find((k): k is FormatValue => formatValues.includes(k as FormatValue))

    if (!format) return

    const quality = getQuality(rest)
    const progressive = getProgressive(rest)

    return function formatTransform(image) {
        setMetadata(image, 'format', format)
        setMetadata(image, 'quality', quality)
        setMetadata(image, 'progressive', progressive)

        //@ts-ignore
        return image.toFormat(format, { quality, progressive })
    }
}