import type { TransformOption } from '../types.js'

export interface QualityOptions {
  quality: string
}

export const getQuality: TransformOption<QualityOptions, number> = ({ quality: _quality }, state) => {
  const quality = _quality && parseInt(_quality)

  if (!quality) return

  state.transforms.quality = quality
  return quality
}
