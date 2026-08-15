import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface InvertOptions {
  invert: '' | 'true' | 'false'
}

export const invert: TransformFactory<InvertOptions> = ({ invert }) => {
  if (parseBooleanDirective('invert', invert) !== true) return

  return function invertTransform(state, image) {
    state.transforms.invert = true
    return image.negate()
  }
}
