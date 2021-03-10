import { MetaDirective } from "../types";

export interface KernelOptions {
    kernel: KernelValue
}

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = typeof kernelValues[number]

/**
 * Use this directive to set a different interpolation kernel when resizing the image.
 * 
 * @name Kernel
 * @category Import Directives
 * @keyword kernel
 * @type _nearest_ \| _cubic_ \| _mitchell_ \| _lanczos2_ \| _lanczos3_
 */
export const kernel:MetaDirective<KernelOptions,KernelValue> = ({ kernel }, ctx) => {
    if (!kernel || !kernelValues.includes(kernel)) return null

    ctx.useParam('kernel')
    ctx.setMetadata('kernel', kernel)

    return kernel
}