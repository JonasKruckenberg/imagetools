import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface GrayscaleOptions {
  grayscale: '' | 'true' | 'false'
}

export const grayscale: TransformFactory<GrayscaleOptions> = ({ grayscale }) => {
  if (parseBooleanDirective('grayscale', grayscale) !== true) return

  return function grayscaleTransform(state, image) {
    state.transforms.grayscale = true
    return image.grayscale()
  }
}
