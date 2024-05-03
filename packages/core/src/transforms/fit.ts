import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

export type FitValue = (typeof fitValues)[number]

export interface FitOptions {
  fit: FitValue
}

export const getFit: TransformOption<FitOptions, FitValue> = (config, image) => {
  let fit: FitValue | undefined = undefined

  if (config.fit && fitValues.includes(config.fit)) {
    fit = config.fit
  } else {
    fit = Object.keys(config).find(
      (k: string): k is FitValue => (fitValues as unknown as string[]).includes(k) && config[k] === ''
    )
  }

  if (!fit) return

  image[METADATA].fit = fit

  return fit
}
