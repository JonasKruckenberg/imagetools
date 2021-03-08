import { Directive, ImageFormat } from "../types"

interface FormatOptions {
    format: ImageFormat
}

export const format: Directive<FormatOptions> = (ctx, { useParam, setMetadata }) => {
    const formats: ImageFormat[] = ['avif', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'heif', 'heic', 'gif']

    const format = formats.includes(ctx.format) ? ctx.format : formats.find(f => f in ctx && ctx[f] === '')

    useParam('format')
    setMetadata('format', format)

    return function formatTransform(image) {
        //@ts-expect-error sharps types are not quite accurate
        return image.toFormat(format)
    }
}