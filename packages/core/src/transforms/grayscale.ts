import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface GrayscaleOptions {
  grayscale: '' | 'true'
}

export const grayscale: TransformFactory<GrayscaleOptions> = ({ grayscale }) => {
  if (grayscale !== '' && grayscale !== 'true') return

  return function grayscaleTransform(image) {
    setMetadata(image, 'grayscale', true)

    return image.grayscale()
  }
}
