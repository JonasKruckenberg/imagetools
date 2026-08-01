import type { TransformOption } from '../types.js'

export interface BackgroundOptions {
  background: string
}

export const getBackground: TransformOption<BackgroundOptions, string> = ({ background }, state) => {
  if (typeof background !== 'string' || !background.length) return

  state.transforms.backgroundDirective = background
  return background
}
