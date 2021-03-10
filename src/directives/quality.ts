import { MetaDirective } from "../types";

export interface QualityOptions {
    quality: string
}

/**
 * All formats (except `gif`) allow the quality to be adjusted by setting this directive.
 *
 * The argument must be a number between 0 and 100.
 *
 * > See sharps [Output options](https://sharp.pixelplumbing.com/api-output) for default quality values.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?format=webp&quality=100'
 * import Image from 'examepl.jpg?png&quality=200'
 * import Images from 'examepl.jpg?avif&quality=10,50,75'
 * ```
 * 
 * @name Quality
 * @category Import Directives
 * @keyword `quality`
 * @type _integer_
 */
export const quality: MetaDirective<QualityOptions, number> = ({ quality: _quality }, ctx) => {
    const quality = parseInt(_quality || '')

    if (isNaN(quality) || quality < 1 || quality > 100) return null

    ctx.useParam('quality')
    ctx.setMetadata('quality', quality)

    return quality
}