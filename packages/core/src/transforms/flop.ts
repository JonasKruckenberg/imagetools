import type { TransformFactory } from '../types.js'

export interface FlopOptions {
  flop: '' | 'true'
}

export const flop: TransformFactory<FlopOptions> = ({ flop }) => {
  if (flop !== '' && flop !== 'true') return

  return function flopTransform(state, image) {
    state.transforms.flop = true
    return image.flop()
  }
}
