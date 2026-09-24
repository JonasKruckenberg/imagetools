import type { TransformFactory } from '../types.js'

export interface TintOptions {
  tint: string
}

export const tint: TransformFactory<TintOptions> = ({ tint }) => {
  if (typeof tint !== 'string' || !tint) return

  return function tintTransform(state, image) {
    const color = /^[0-9A-Fa-f]+$/.test(tint) ? '#' + tint : tint
    state.transforms.tint = color
    return image.tint(color)
  }
}
