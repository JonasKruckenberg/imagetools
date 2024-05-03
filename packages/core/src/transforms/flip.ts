import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface FlipOptions {
  flip: '' | 'true'
}

export const flip: TransformFactory<FlipOptions> = ({ flip }) => {
  if (flip !== '' && flip !== 'true') return

  return function flipTransform(image) {
    image[METADATA].flip = true

    return image.flip()
  }
}
