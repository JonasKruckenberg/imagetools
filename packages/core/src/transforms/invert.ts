import type { TransformFactory } from '../types.js'

export interface InvertOptions {
  invert: '' | 'true'
}

export const invert: TransformFactory<InvertOptions> = ({ invert }, ctx) => {
  if (invert !== '' && invert !== 'true') return

  ctx.useParam('invert')

  return function invertTransform(state, image) {
    state.transforms.invert = true
    return image.negate()
  }
}
