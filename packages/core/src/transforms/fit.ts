import type { TransformOption } from '../types.js'
import { fitValues } from '../lib/values.js'
import { formatExpected, invalidDirectiveValue, orFalseToDisable } from '../lib/parse.js'

export { fitValues } from '../lib/values.js'

export type FitValue = (typeof fitValues)[number]

export interface FitOptions {
  fit: FitValue | 'false'
}

function parseFit(fit: string | undefined): FitValue | undefined {
  if (fit === undefined || fit === '' || fit === 'false') return undefined
  if (fitValues.includes(fit as FitValue)) return fit as FitValue
  throw invalidDirectiveValue('fit', fit, orFalseToDisable(`one of ${formatExpected(fitValues)}`))
}

/**
 * Resolves the `fit` value from the parsed directives: the `fit` keyword, or a
 * bare shorthand directive such as `?cover`. Validates and throws for invalid
 * values. Returns `undefined` when no fit is given, and records the applied
 * value on `state.transforms`.
 */
export const getFit: TransformOption<FitOptions, FitValue> = (config, state) => {
  const fit =
    parseFit(config.fit) ??
    Object.keys(config).find((k: string): k is FitValue => fitValues.some((value) => value === k) && config[k] === '')
  if (fit === undefined) return

  state.transforms.fit = fit
  return fit
}
