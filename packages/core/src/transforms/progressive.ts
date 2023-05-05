import { TransformOption } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface ProgressiveOptions {
  progressive: '' | 'true'
}

export const getProgressive: TransformOption<ProgressiveOptions> = ({ progressive }, image) => {
  if (progressive !== '' && progressive !== 'true') return

  setMetadata(image, 'progressive', true)

  return true
}
