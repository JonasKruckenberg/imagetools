import { MetaDirective } from "../types"

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = typeof kernelValues[number]

export interface KernelOptions {
    kernel: KernelValue
}

export const kernel: MetaDirective<KernelOptions,KernelValue> = ({ kernel },ctx) => {
    if(kernel && kernelValues.includes(kernel)) return kernel
}