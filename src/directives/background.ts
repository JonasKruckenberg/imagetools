import { DirectiveContext, DirectiveOptions } from "../types";

export const background = ({ background }: DirectiveOptions, ctx: DirectiveContext) => {
    if (!background) return null

    ctx.useParam('background')
    ctx.setMetadata('background', background)

    return background
}