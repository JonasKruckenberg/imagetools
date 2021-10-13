import { TransformOption } from '../types'
import { setMetadata } from '../lib/metadata'

export interface QualityOptions {
  quality: string
}

export const getQuality: TransformOption<QualityOptions, number> = ({ quality: _quality }, image) => {
  const quality = _quality && parseInt(_quality)

  if (!quality) return

  setMetadata(image, 'quality', quality)

  return quality
}
