import type { TransformOption } from '../types.js'
import { fitValues } from '../lib/values.js'

export { fitValues } from '../lib/values.js'

export type FitValue = (typeof fitValues)[number]

export interface FitOptions {
  fit: FitValue
}

export const getFit: TransformOption<FitOptions, FitValue> = (config, state) => {
  let fit: FitValue | undefined

  if (config.fit && fitValues.includes(config.fit)) {
    fit = config.fit
  } else {
    fit = Object.keys(config).find(
      (k: string): k is FitValue => fitValues.some((value) => value === k) && config[k] === ''
    )
  }

  if (!fit) return

  state.transforms.fit = fit
  return fit
}
