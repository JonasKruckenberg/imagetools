import { Directive, ImageFormat } from "../types"
import { quality as getQuality } from "./quality"

interface FormatOptions {
    format: ImageFormat
}

export const format: Directive<FormatOptions> = (ctx, { useParam, setMetadata }) => {
    const formats: ImageFormat[] = ['avif', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'heif', 'heic', 'gif']

    const format = formats.includes(ctx.format) ? ctx.format : formats.find(f => f in ctx && ctx[f] === '')

    if (!format) return null

    const quality = getQuality(ctx, { useParam, setMetadata })

    useParam('format')
    setMetadata('format', format)

    return function formatTransform(image) {
        //@ts-expect-error sharps types are not quite accurate
        return image.toFormat(format,{ quality })
    }
}