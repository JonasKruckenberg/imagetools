import { Directive, DirectiveContext, DirectiveOptions } from "../types";

export interface FlopOptions {
    flop: string
}

/**
 * Flop the image image about the horizontal axis. 
 * This step is always performed **after** any rotation.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?flop'
 * import Image from 'exmaple.jpg?flop=true'
 * ```
 * 
 * @name Flop
 * @category Import Directives
 * @keyword `flop`
 * @type _boolean_
 */
export const flop:Directive<FlopOptions> = ({ flop }: DirectiveOptions, ctx: DirectiveContext) => {
    if (flop !== '' && flop !== 'true') return null

    ctx.useParam('flop')
    ctx.setMetadata('flop', true)

    return function flopTransform(image) {
        return image.flop()
    }
}