import { Directive, DirectiveContext, DirectiveOptions } from "../types";

export interface GrayscaleOptions {
    grayscale: string
}

/**
 * Converts the image to an 8-bit grayscale image.
 * 
 * > This directive will convert the image to the `b-w` colorspace, 
 * > meaning the resulting image will only have one channel.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?grayscale'
 * import Image from 'exmaple.jpg?grayscale=true'
 * ```
 * 
 * @name Grayscale
 * @category Import Directives
 * @keyword `grayscale`
 * @type _boolean_
 */
export const grayscale:Directive<GrayscaleOptions> = ({ grayscale }: DirectiveOptions, ctx: DirectiveContext) => {
    if (grayscale !== '' && grayscale !== 'true') return null

    ctx.useParam('grayscale')
    ctx.setMetadata('grayscale', true)

    return function grayscaleTransform(image) {
        return image.grayscale().toColorspace('b-w')
    }
}