import type { TransformFactory } from '../types.js'

export interface NormalizeOptions {
  normalize: '' | 'true'
}

export const normalize: TransformFactory<NormalizeOptions> = ({ normalize }, ctx) => {
  if (normalize !== '' && normalize !== 'true') return

  ctx.useParam('normalize')

  return function normalizeTransform(state, image) {
    state.transforms.normalize = true
    return image.normalize()
  }
}
