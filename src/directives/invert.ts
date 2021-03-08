import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    invert: string
}

export const invert:Directive<FlipOptions> = ({ invert }: DirectiveOptions, ctx: DirectiveContext) => {
    if (invert !== '' && invert !== 'true') return null

    ctx.useParam('invert')
    ctx.setMetadata('invert', true)

    return function invertTransform(image) {
        return image.negate()
    }
}