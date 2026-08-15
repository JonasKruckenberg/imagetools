import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface FlipOptions {
  flip: '' | 'true' | 'false'
}

export const flip: TransformFactory<FlipOptions> = ({ flip }) => {
  if (parseBooleanDirective('flip', flip) !== true) return

  return function flipTransform(state, image) {
    state.transforms.flip = true
    return image.flip()
  }
}
