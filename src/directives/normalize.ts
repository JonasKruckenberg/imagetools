import { Directive, DirectiveContext, DirectiveOptions } from "../types";

interface NormalizeOptions {
    normalize: string
}

export const normalize:Directive<NormalizeOptions> = ({ normalize }: DirectiveOptions, ctx: DirectiveContext) => {
    if (normalize !== '' && normalize !== 'true') return null

    ctx.useParam('normalize')
    ctx.setMetadata('normalize', true)

    return function normalizeTransform(image) {
        return image.normalize()
    }
}