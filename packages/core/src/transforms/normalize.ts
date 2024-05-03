import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface NormalizeOptions {
  normalize: '' | 'true'
}

export const normalize: TransformFactory<NormalizeOptions> = ({ normalize }) => {
  if (normalize !== '' && normalize !== 'true') return

  return function normalizeTransform(image) {
    image[METADATA].normalize = true

    return image.normalize()
  }
}
