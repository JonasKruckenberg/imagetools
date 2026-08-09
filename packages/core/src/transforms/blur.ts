import type { TransformFactory } from '../types.js'
import { invalidDirectiveValue, parseFloatDirective } from '../lib/parse.js'

export interface BlurOptions {
  blur: string
}

/** The sigma range accepted by sharp's `blur` operation. */
const BLUR_SIGMA_RANGE = 'a number between 0.3 and 1000, "true", "false" or a bare "blur" directive'

/**
 * Parses a `blur` directive value. A bare `blur` or `blur=true` blurs with a
 * default sigma, `blur=false` disables it and a number sets the sigma.
 * Returns `undefined` when the directive is absent.
 */
export function parseBlur(blur: string | undefined): number | boolean | undefined {
  if (blur === undefined) return undefined
  if (blur === '' || blur === 'true') return true
  if (blur === 'false') return false
  const value = parseFloatDirective('blur', blur, BLUR_SIGMA_RANGE)
  if (value! < 0.3 || value! > 1000) {
    throw invalidDirectiveValue('blur', blur, BLUR_SIGMA_RANGE)
  }
  return value
}

export const blur: TransformFactory<BlurOptions> = ({ blur: blurDirective }) => {
  const blur = parseBlur(blurDirective)

  if (!blur) return

  return function blurTransform(state, image) {
    state.transforms.blur = blur
    return image.blur(blur)
  }
}
