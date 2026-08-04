import type { TransformFactory } from '../types.js'
import { getBackground } from './background.js'

export interface RotateOptions {
  rotate: string
}

export const rotate: TransformFactory<RotateOptions> = (config) => {
  const rotate = config.rotate && parseInt(config.rotate)

  if (!rotate) return

  return function rotateTransform(state, image) {
    state.transforms.rotate = rotate
    return image.rotate(rotate, {
      background: getBackground(config, state)
    })
  }
}
