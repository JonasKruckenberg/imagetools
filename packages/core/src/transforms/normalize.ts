import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface NormalizeOptions {
  normalize: '' | 'true' | 'false'
}

export const normalize: TransformFactory<NormalizeOptions> = ({ normalize }) => {
  if (parseBooleanDirective('normalize', normalize) !== true) return

  return function normalizeTransform(state, image) {
    state.transforms.normalize = true
    return image.normalize()
  }
}
