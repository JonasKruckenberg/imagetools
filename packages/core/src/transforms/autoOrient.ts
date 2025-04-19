import { METADATA } from '../lib/metadata.js'
import type { TransformFactory } from '../types.js'

export interface AutoOrientOptions {
  autoOrient: '' | 'true' | 'false'
}

export const autoOrient: TransformFactory<AutoOrientOptions> = ({ autoOrient }) => {
  if (autoOrient === undefined || autoOrient === 'false') return

  if (autoOrient === '' || autoOrient === 'true') {
    return function autoOrientTransform(image) {
      image[METADATA].height = image[METADATA].autoOrient.height
      image[METADATA].width = image[METADATA].autoOrient.width
      return image.autoOrient()
    }
  }

  throw new Error(`Invalid autoOrient value: ${autoOrient}`)
}
