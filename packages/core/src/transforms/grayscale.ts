import type { TransformFactory } from '../types.js'

export interface GrayscaleOptions {
  grayscale: '' | 'true'
}

export const grayscale: TransformFactory<GrayscaleOptions> = ({ grayscale }) => {
  if (grayscale !== '' && grayscale !== 'true') return

  return function grayscaleTransform(state, image) {
    state.transforms.grayscale = true
    return image.grayscale()
  }
}
