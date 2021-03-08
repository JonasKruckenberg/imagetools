import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface FlipOptions {
    normalize: string
}

export const normalize:Directive<FlipOptions> = ({ normalize }: DirectiveOptions, ctx: DirectiveContext) => {
    if (normalize !== '' && normalize !== 'true') return null

    ctx.useParam('normalize')
    ctx.setMetadata('normalize', true)

    return function normalizeTransform(image) {
        return image.normalize()
    }
}