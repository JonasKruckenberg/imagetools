import type { TransformFactory } from '../types.js'

export interface autoOrientOptions {
  noAutoOrient: '' | 'true' | 'false'
}

export const autoOrient: TransformFactory<autoOrientOptions> = ({ noAutoOrient }) => {
  // This is an opt out. We apply autoOrient by default.
  if (noAutoOrient === '' || noAutoOrient === 'true') return

  if (noAutoOrient === undefined || noAutoOrient === 'false') {
    return function autoOrientTransform(state, image) {
      state.info.height = state.info.autoOrient.height
      state.info.width = state.info.autoOrient.width
      return image.autoOrient()
    }
  }

  throw new Error(`Invalid noAutoOrient value: ${noAutoOrient}`)
}
