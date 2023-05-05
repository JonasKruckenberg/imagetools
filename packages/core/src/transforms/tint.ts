import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface TintOptions {
  tint: string
}

export const tint: TransformFactory<TintOptions> = ({ tint }) => {
  if (typeof tint !== 'string' || !tint.length) return

  return function tintTransform(image) {
    setMetadata(image, 'tint', '#' + tint)

    return image.tint('#' + tint)
  }
}
