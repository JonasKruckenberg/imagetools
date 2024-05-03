import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface TintOptions {
  tint: string
}

export const tint: TransformFactory<TintOptions> = ({ tint }) => {
  if (typeof tint !== 'string' || !tint.length) return

  return function tintTransform(image) {
    image[METADATA].tint = '#' + tint

    return image.tint('#' + tint)
  }
}
