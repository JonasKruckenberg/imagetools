import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    flip: string
}

export const flip:Directive<FlipOptions> = ({ flip }: DirectiveOptions, ctx: DirectiveContext) => {
    if (flip !== '' && flip !== 'true') return null

    ctx.useParam('flip')
    ctx.setMetadata('flip', true)

    return function flipTransform(image) {
        return image.flip()
    }
}