import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface QualityOptions {
  quality: string
}

export const getQuality: TransformOption<QualityOptions, number> = ({ quality: _quality }, image) => {
  const quality = _quality && parseInt(_quality)

  if (!quality) return

  image[METADATA].quality = quality

  return quality
}
