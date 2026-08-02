import type { TransformOption } from '../types.js'

export interface LosslessOptions {
  lossless: '' | 'true'
}

export const getLossless: TransformOption<LosslessOptions> = ({ lossless }, state) => {
  if (lossless !== '' && lossless !== 'true') return

  state.transforms.lossless = true
  return true
}
