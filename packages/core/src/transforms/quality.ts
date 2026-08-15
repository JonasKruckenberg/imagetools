import type { TransformOption } from '../types.js'
import { invalidDirectiveValue, orFalseToDisable, parseIntegerDirective } from '../lib/parse.js'

export interface QualityOptions {
  quality: string
}

function parseQuality(quality: string | undefined): number | undefined {
  if (quality === undefined || quality === '') return undefined
  const value = parseIntegerDirective('quality', quality, orFalseToDisable('an integer between 0 and 100'))
  if (value! < 0 || value! > 100) {
    throw invalidDirectiveValue('quality', quality, orFalseToDisable('an integer between 0 and 100'))
  }
  return value
}

/**
 * Resolves the `quality` value from the parsed directives, validating and
 * throwing for invalid values. Returns `undefined` when the directive is
 * absent, and records the applied value on `state.transforms`.
 */
export const getQuality: TransformOption<QualityOptions, number> = ({ quality: qualityDirective }, state) => {
  const quality = parseQuality(qualityDirective)

  if (quality === undefined) return

  state.transforms.quality = quality
  return quality
}
