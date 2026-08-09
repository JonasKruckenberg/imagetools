import type { TransformOption } from '../types.js'

export interface BackgroundOptions {
  background: string
}

/**
 * Resolves the `background` directive value, e.g. a hex color or CSS color.
 * Returns `undefined` when the directive is absent, and records the applied
 * value on `state.transforms`.
 */
export const getBackground: TransformOption<BackgroundOptions, string> = ({ background }, state) => {
  if (typeof background !== 'string' || !background) return

  state.transforms.backgroundDirective = background
  return background
}
