import type { TransformFactory } from '../types.js'
import { orFalseToDisable, parseIntegerDirective } from '../lib/parse.js'
import { getBackground } from './background.js'

export interface RotateOptions {
  rotate: string
}

/**
 * Parses a `rotate` directive value in degrees. Returns `undefined` when the
 * directive is absent or disabled with `"false"`, and throws for anything that
 * is not an integer.
 */
export function parseRotate(rotate: string | undefined): number | undefined {
  return parseIntegerDirective('rotate', rotate, orFalseToDisable('an angle in degrees'))
}

export const rotate: TransformFactory<RotateOptions> = (config) => {
  const rotate = parseRotate(config.rotate)

  if (!rotate) return

  return function rotateTransform(state, image) {
    state.transforms.rotate = rotate
    return image.rotate(rotate, {
      background: getBackground(config, state)
    })
  }
}
