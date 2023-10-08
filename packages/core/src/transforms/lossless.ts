import { TransformOption } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface LosslessOptions {
  lossless: '' | 'true'
}

export const getLossless: TransformOption<LosslessOptions> = ({ lossless }, image) => {
  if (lossless !== '' && lossless !== 'true') return

  setMetadata(image, 'lossless', true)

  return true
}
