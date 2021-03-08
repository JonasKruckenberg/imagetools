import { FitEnum } from "sharp";
import { DirectiveContext, DirectiveOptions } from "../types";

export const fit = ({ fit }: DirectiveOptions, ctx: DirectiveContext): keyof FitEnum => {
    if (!fit || !fitValues.includes(fit)) return null

    ctx.useParam('fit')
    ctx.setMetadata('fit', fit)

    return fit
}

const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside']