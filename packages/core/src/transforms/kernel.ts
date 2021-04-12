import { TransformOption } from "../types"
import { setMetadata } from "../lib/metadata";

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = typeof kernelValues[number]

export interface KernelOptions {
    kernel: KernelValue
}

export const getKernel: TransformOption<KernelOptions, KernelValue> = ({ kernel }, image) => {
    if (kernel && kernelValues.includes(kernel)) {
        setMetadata(image, 'kernel', kernel)

        return kernel
    }
}