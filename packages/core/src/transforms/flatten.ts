import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'
import { getBackground } from './background.js'

export interface FlattenOptions {
  flatten: '' | 'true'
}

export const flatten: TransformFactory<FlattenOptions> = (config) => {
  if (config.flatten !== '' && config.flatten !== 'true') return

  return function flattenTransform(image) {
    image[METADATA].flatten = true

    return image.flatten({
      background: getBackground(config, image)
    })
  }
}
