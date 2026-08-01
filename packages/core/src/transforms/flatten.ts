import type { TransformFactory } from '../types.js'
import { getBackground } from './background.js'

export interface FlattenOptions {
  flatten: '' | 'true'
}

export const flatten: TransformFactory<FlattenOptions> = (config) => {
  if (config.flatten !== '' && config.flatten !== 'true') return

  return function flattenTransform(state, image) {
    state.transforms.flatten = true
    return image.flatten({
      background: getBackground(config, state)
    })
  }
}
