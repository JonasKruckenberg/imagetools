import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'
import { getBackground } from './background.js'

export interface FlattenOptions {
  flatten: '' | 'true' | 'false'
}

export const flatten: TransformFactory<FlattenOptions> = (config) => {
  if (parseBooleanDirective('flatten', config.flatten) !== true) return

  return function flattenTransform(state, image) {
    state.transforms.flatten = true
    return image.flatten({
      background: getBackground(config, state)
    })
  }
}
