import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface GrayscaleOptions {
  grayscale: '' | 'true'
}

export const grayscale: TransformFactory<GrayscaleOptions> = ({ grayscale }) => {
  if (grayscale !== '' && grayscale !== 'true') return

  return function grayscaleTransform(image) {
    image[METADATA].grayscale = true

    return image.grayscale()
  }
}
