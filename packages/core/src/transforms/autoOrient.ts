import type { TransformFactory } from '../types.js'
import { parseBooleanDirective } from '../lib/parse.js'

export interface autoOrientOptions {
  noAutoOrient: '' | 'true' | 'false'
}

export const autoOrient: TransformFactory<autoOrientOptions> = ({ noAutoOrient }) => {
  // This is an opt out. We apply autoOrient by default.
  if (parseBooleanDirective('noAutoOrient', noAutoOrient) === true) return

  return function autoOrientTransform(state, image) {
    state.info.height = state.info.autoOriented.height
    state.info.width = state.info.autoOriented.width
    return image.autoOrient()
  }
}
