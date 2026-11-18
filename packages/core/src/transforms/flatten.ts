import type { TransformFactory } from '../types.js'
import { useParams } from '../lib/use-params.js'
import { getBackground } from './background.js'

export interface FlattenOptions {
  flatten: '' | 'true'
}

export const flatten: TransformFactory<FlattenOptions> = (config, ctx) => {
  if (config.flatten !== '' && config.flatten !== 'true') return

  useParams(config, ctx, ['flatten', 'background'])

  return function flattenTransform(state, image) {
    state.transforms.flatten = true
    return image.flatten({
      background: getBackground(config, state)
    })
  }
}
