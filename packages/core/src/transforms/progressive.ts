import type { TransformOption } from '../types.js'

export interface ProgressiveOptions {
  progressive: '' | 'true'
}

export const getProgressive: TransformOption<ProgressiveOptions> = ({ progressive }, state) => {
  if (progressive !== '' && progressive !== 'true') return

  state.transforms.progressive = true
  return true
}
