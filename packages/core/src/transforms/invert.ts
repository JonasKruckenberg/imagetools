import { TransformFactory } from '../types'
import { setMetadata } from '../lib/metadata'

export interface InvertOptions {
  invert: '' | 'true'
}

export const invert: TransformFactory<InvertOptions> = ({ invert }) => {
  if (invert !== '' && invert !== 'true') return

  return function invertTransform(image) {
    setMetadata(image, 'invert', true)

    return image.negate()
  }
}
