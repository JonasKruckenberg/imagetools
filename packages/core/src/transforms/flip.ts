import type { TransformFactory } from '../types.js'

export interface FlipOptions {
  flip: '' | 'true'
}

export const flip: TransformFactory<FlipOptions> = ({ flip }) => {
  if (flip !== '' && flip !== 'true') return

  return function flipTransform(state, image) {
    state.transforms.flip = true
    return image.flip()
  }
}
