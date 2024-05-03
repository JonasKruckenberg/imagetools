import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'
import { getBackground } from './background.js'

export interface RotateOptions {
  rotate: string
}

export const rotate: TransformFactory<RotateOptions> = (config) => {
  const rotate = config.rotate && parseInt(config.rotate)

  if (!rotate) return

  return function rotateTransform(image) {
    image[METADATA].rotate = rotate

    return image.rotate(rotate, {
      background: getBackground(config, image)
    })
  }
}
