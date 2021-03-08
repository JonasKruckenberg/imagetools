import { KernelEnum } from "sharp";
import { DirectiveContext, DirectiveOptions } from "../types";

export const kernel = ({ kernel }: DirectiveOptions, ctx: DirectiveContext): keyof KernelEnum => {
    if (!kernel || !kernelValues.includes(kernel)) return null

    ctx.useParam('kernel')
    ctx.setMetadata('kernel', kernel)

    return kernel
}

const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3']