import { Directive } from "../types"
import { quality as getQuality } from "./quality"

export type FormatShorthandOptions = {
    [key in ImageFormat]?: ''
}

export interface FormatOptions {
    format: ImageFormat
}

export type ImageFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'

/**
 * Convert the image into the given format.
 * 
 * > NOTE: Converting to the `gif` format requires libvips compiled with support for ImageMagick or GraphicsMagick
 * > See [The sharp docs](https://sharp.pixelplumbing.com/install#custom-libvips) for details.
 *
 * > You cannot use multiple shorthands, use `format` instead.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?format=webp'
 * import Image from 'examepl.jpg?png'
 * import Images from 'examepl.jpg?format=webp,avif,heic'
 * ```
 * 
 * @name Format
 * @category Import Directives
 * @keyword `format` 
 * @type _heic_ \| _heif_ \| _avif_ \| _jpeg_ \| _jpg_ \| _png_ \| _tiff_ \| _webp_ \| _gif_
 * @shorthands `heic` \| `heif` \| `avif` \| `jpg` \|`jpeg` \| `png` \| `tiff` \| `webp` \| (`gif`)
 */
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