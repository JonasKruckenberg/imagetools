import { TransformFactory } from '../types'
import { setMetadata } from '../lib/metadata'

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
