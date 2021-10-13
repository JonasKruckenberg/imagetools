import { TransformOption } from '../types'
import { setMetadata } from '../lib/metadata'

export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

export type FitValue = typeof fitValues[number]

export interface FitOptions {
  fit: FitValue
}

export const getFit: TransformOption<FitOptions, FitValue> = (config, image) => {
  let fit: FitValue | undefined = undefined

  if (config.fit && fitValues.includes(config.fit)) {
    fit = config.fit
  } else {
    fit = Object.keys(config).find((k: any): k is FitValue => fitValues.includes(k) && config[k] === '')
  }

  if (!fit) return

  setMetadata(image, 'fit', fit)

  return fit
}
