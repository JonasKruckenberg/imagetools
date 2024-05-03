import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface ProgressiveOptions {
  progressive: '' | 'true'
}

export const getProgressive: TransformOption<ProgressiveOptions> = ({ progressive }, image) => {
  if (progressive !== '' && progressive !== 'true') return

  image[METADATA].progressive = true

  return true
}
