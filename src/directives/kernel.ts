import { MetaDirective } from "../types";

interface KernelOptions {
    kernel: KernelValue
}

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = typeof kernelValues[number]

export const kernel:MetaDirective<KernelOptions,KernelValue> = ({ kernel }, ctx) => {
    if (!kernel || !kernelValues.includes(kernel)) return null

    ctx.useParam('kernel')
    ctx.setMetadata('kernel', kernel)

    return kernel
}