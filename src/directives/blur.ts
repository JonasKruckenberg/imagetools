import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    blur: string
}

export const blur: Directive<FlipOptions> = ({ blur: _blur }: DirectiveOptions, ctx: DirectiveContext) => {
    const blur = parseFloat(_blur)

    if(isNaN(blur) || blur < 0.3 || blur > 1000) return null

    ctx.useParam('blur')
    ctx.setMetadata('blur', blur)

    return function blurTransform(image) {
        return image.blur(blur)
    }
}