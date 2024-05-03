import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface BackgroundOptions {
  background: string
}

export const getBackground: TransformOption<BackgroundOptions, string> = ({ background }, image) => {
  if (typeof background !== 'string' || !background.length) return

  image[METADATA].backgroundDirective = background

  return background
}
