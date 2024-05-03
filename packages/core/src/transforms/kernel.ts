import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = (typeof kernelValues)[number]

export interface KernelOptions {
  kernel: KernelValue
}

export const getKernel: TransformOption<KernelOptions, KernelValue> = ({ kernel }, image) => {
  if (kernel && kernelValues.includes(kernel)) {
    image[METADATA].kernel = kernel

    return kernel
  }
}
