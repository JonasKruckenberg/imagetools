import { DirectiveContext, DirectiveOptions } from "../types";

export const quality = ({ quality: _quality }: DirectiveOptions, ctx: DirectiveContext) => {
    const quality = parseInt(_quality)

    if (isNaN(quality) || quality < 1 || quality > 100) return null

    ctx.useParam('quality')
    ctx.setMetadata('qulity', quality)

    return quality
}