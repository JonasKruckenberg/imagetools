import { METADATA } from '../lib/metadata.js'
import type { TransformFactory } from '../types.js'

export interface autoOrientOptions {
  noAutoOrient: '' | 'true' | 'false'
}

export const autoOrient: TransformFactory<autoOrientOptions> = ({ noAutoOrient }) => {
  // This is an opt out. We apply autoOrient by default.
  if (noAutoOrient === '' || noAutoOrient === 'true') return

  if (noAutoOrient === undefined || noAutoOrient === 'false') {
    return function autoOrientTransform(image) {
      image[METADATA].height = image[METADATA].autoOrient.height
      image[METADATA].width = image[METADATA].autoOrient.width
      return image.autoOrient()
    }
  }

  throw new Error(`Invalid noAutoOrient value: ${noAutoOrient}`)
}
