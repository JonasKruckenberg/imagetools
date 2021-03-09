import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    flip: string
}

/**
 * Flip the image image about the vertical axis. 
 * This step is always performed **after** any rotation.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?flip'
 * import Image from 'exmaple.jpg?flip=true'
 * ```
 * 
 * @name Flip
 * @category Import Directives
 * @keyword `flip`
 * @type _boolean_
 */
export const flip:Directive<FlipOptions> = ({ flip }: DirectiveOptions, ctx: DirectiveContext) => {
    if (flip !== '' && flip !== 'true') return null

    ctx.useParam('flip')
    ctx.setMetadata('flip', true)

    return function flipTransform(image) {
        return image.flip()
    }
}