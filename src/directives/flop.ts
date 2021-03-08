import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    flop: string
}

export const flop:Directive<FlipOptions> = ({ flop }: DirectiveOptions, ctx: DirectiveContext) => {
    if (flop !== '' && flop !== 'true') return null

    ctx.useParam('flop')
    ctx.setMetadata('flop', true)

    return function flopTransform(image) {
        return image.flop()
    }
}