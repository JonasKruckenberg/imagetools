import { TransformOption } from '../types'
import { setMetadata } from '../lib/metadata'

export interface BackgroundOptions {
  background: string
}

export const getBackground: TransformOption<BackgroundOptions, string> = ({ background }, image) => {
  if (typeof background !== 'string' || !background.length) return

  setMetadata(image, 'background', background)

  return background
}
