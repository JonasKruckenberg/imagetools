import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface FlopOptions {
  flop: '' | 'true'
}

export const flop: TransformFactory<FlopOptions> = ({ flop }) => {
  if (flop !== '' && flop !== 'true') return

  return function flopTransform(image) {
    setMetadata(image, 'flop', true)

    return image.flop()
  }
}
