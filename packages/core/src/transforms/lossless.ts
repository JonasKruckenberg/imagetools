import type { TransformOption } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface LosslessOptions {
  lossless: '' | 'true' | 'false'
}

/**
 * Resolves the `lossless` directive into a boolean: a bare `lossless` or
 * `lossless=true` enables it and `lossless=false` disables it. Returns
 * `undefined` when the directive is absent, and records the applied value on
 * `state.transforms`.
 */
export const getLossless: TransformOption<LosslessOptions, boolean> = ({ lossless }, state) => {
  if (parseBooleanDirective('lossless', lossless) !== true) return

  state.transforms.lossless = true
  return true
}
