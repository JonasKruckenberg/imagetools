import type { TransformFactory } from '../types.js'

export interface TintOptions {
  tint: string
}

export const tint: TransformFactory<TintOptions> = ({ tint }, ctx) => {
  if (typeof tint !== 'string' || !tint) return

  ctx.useParam('tint')

  return function tintTransform(state, image) {
    state.transforms.tint = '#' + tint
    return image.tint('#' + tint)
  }
}
