import type { TransformOption } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface ProgressiveOptions {
  progressive: '' | 'true' | 'false'
}

/**
 * Resolves the `progressive` directive into a boolean: a bare `progressive`
 * or `progressive=true` enables it and `progressive=false` disables it.
 * Returns `undefined` when the directive is absent, and records the applied
 * value on `state.transforms`.
 */
export const getProgressive: TransformOption<ProgressiveOptions, boolean> = ({ progressive }, state) => {
  if (parseBooleanDirective('progressive', progressive) !== true) return

  state.transforms.progressive = true
  return true
}
