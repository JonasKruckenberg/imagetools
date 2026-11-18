import type { TransformFactory } from '../types.js'

export interface FlipOptions {
  flip: '' | 'true'
}

export const flip: TransformFactory<FlipOptions> = ({ flip }, ctx) => {
  if (flip !== '' && flip !== 'true') return

  ctx.useParam('flip')

  return function flipTransform(state, image) {
    state.transforms.flip = true
    return image.flip()
  }
}
