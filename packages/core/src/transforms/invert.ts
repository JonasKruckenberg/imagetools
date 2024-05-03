import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface InvertOptions {
  invert: '' | 'true'
}

export const invert: TransformFactory<InvertOptions> = ({ invert }) => {
  if (invert !== '' && invert !== 'true') return

  return function invertTransform(image) {
    image[METADATA].invert = true

    return image.negate()
  }
}
