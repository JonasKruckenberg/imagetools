import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface FlipOptions {
  flip: '' | 'true'
}

export const flip: TransformFactory<FlipOptions> = ({ flip }) => {
  if (flip !== '' && flip !== 'true') return

  return function flipTransform(image) {
    setMetadata(image, 'flip', true)

    return image.flip()
  }
}
