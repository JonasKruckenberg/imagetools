import type { TransformFactory } from '../types.js'

export interface BlurOptions {
  blur: string
}

export const blur: TransformFactory<BlurOptions> = (config, ctx) => {
  let blur: number | boolean | undefined = undefined

  blur = config.blur ? parseFloat(config.blur) : undefined
  blur ||= config.blur === 'true'
  blur ||= config.blur === ''

  if (!blur) return

  ctx.useParam('blur')

  return function blurTransform(state, image) {
    state.transforms.blur = blur
    return image.blur(blur)
  }
}
