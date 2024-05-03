import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface FlopOptions {
  flop: '' | 'true'
}

export const flop: TransformFactory<FlopOptions> = ({ flop }) => {
  if (flop !== '' && flop !== 'true') return

  return function flopTransform(image) {
    image[METADATA].flop = true

    return image.flop()
  }
}
