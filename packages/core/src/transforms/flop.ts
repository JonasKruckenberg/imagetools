import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface FlopOptions {
  flop: '' | 'true' | 'false'
}

export const flop: TransformFactory<FlopOptions> = ({ flop }) => {
  if (parseBooleanDirective('flop', flop) !== true) return

  return function flopTransform(state, image) {
    state.transforms.flop = true
    return image.flop()
  }
}
