import { Directive, DirectiveContext, DirectiveOptions } from "../types";

export interface NormalizeOptions {
    normalize: string
}

/**
 * 'Normalizes' the image by stretching its luminance to cover the full dynamic range.
 * This Eenhances the output image contrast.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?invert'
 * import Image from 'exmaple.jpg?invert=true'
 * ```
 * 
 * @name Normalize
 * @category Import Directives
 * @keyword `normalize`
 * @type _boolean_
 */
export const normalize:Directive<NormalizeOptions> = ({ normalize }: DirectiveOptions, ctx: DirectiveContext) => {
    if (normalize !== '' && normalize !== 'true') return null

    ctx.useParam('normalize')
    ctx.setMetadata('normalize', true)

    return function normalizeTransform(image) {
        return image.normalize()
    }
}