import type { TransformOption } from '../types.js'
import { kernelValues } from '../lib/values.js'
import { formatExpected, invalidDirectiveValue, orFalseToDisable } from '../lib/parse.js'

export { kernelValues } from '../lib/values.js'

export type KernelValue = (typeof kernelValues)[number]

export interface KernelOptions {
  kernel: KernelValue | 'false'
}

function parseKernel(kernel: string | undefined): KernelValue | undefined {
  if (kernel === undefined || kernel === '' || kernel === 'false') return undefined
  if (kernelValues.includes(kernel as KernelValue)) return kernel as KernelValue
  throw invalidDirectiveValue('kernel', kernel, orFalseToDisable(`one of ${formatExpected(kernelValues)}`))
}

/**
 * Resolves the `kernel` value from the parsed directives, validating and
 * throwing for invalid values. Returns `undefined` when the directive is
 * absent, and records the applied value on `state.transforms`.
 */
export const getKernel: TransformOption<KernelOptions, KernelValue> = ({ kernel }, state) => {
  const value = parseKernel(kernel)
  if (value === undefined) return

  state.transforms.kernel = value
  return value
}
