import type { TransformOption } from '../types.js'
import { kernelValues } from '../lib/values.js'

export { kernelValues } from '../lib/values.js'

export type KernelValue = (typeof kernelValues)[number]

export interface KernelOptions {
  kernel: KernelValue
}

export const getKernel: TransformOption<KernelOptions, KernelValue> = ({ kernel }, state) => {
  if (kernel && kernelValues.includes(kernel)) {
    state.transforms.kernel = kernel
    return kernel
  }
}
