import { Directive, DirectiveContext, DirectiveOptions } from "../types";

export interface InvertOptions {
    invert: string
}

/**
 * Produces a 'negative' of the image.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?invert'
 * import Image from 'exmaple.jpg?invert=true'
 * ```
 * 
 * @name Invert
 * @category Import Directives
 * @keyword `invert`
 * @type _boolean_
 */
export const invert:Directive<InvertOptions> = ({ invert }: DirectiveOptions, ctx: DirectiveContext) => {
    if (invert !== '' && invert !== 'true') return null

    ctx.useParam('invert')
    ctx.setMetadata('invert', true)

    return function invertTransform(image) {
        return image.negate()
    }
}