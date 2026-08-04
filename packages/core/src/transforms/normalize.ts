import type { TransformFactory } from '../types.js'

export interface NormalizeOptions {
  normalize: '' | 'true'
}

export const normalize: TransformFactory<NormalizeOptions> = ({ normalize }) => {
  if (normalize !== '' && normalize !== 'true') return

  return function normalizeTransform(state, image) {
    state.transforms.normalize = true
    return image.normalize()
  }
}
