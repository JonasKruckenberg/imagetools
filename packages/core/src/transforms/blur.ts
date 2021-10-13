import { TransformFactory } from '../types'
import { setMetadata } from '../lib/metadata'

export interface BlurOptions {
  blur: string
}

export const blur: TransformFactory<BlurOptions> = (config, ctx) => {
  let blur: number | boolean | undefined = undefined

  blur = config.blur ? parseFloat(config.blur) : undefined
  blur ||= config.blur === 'true'
  blur ||= config.blur === ''

  if (!blur) return

  return function blurTransform(image) {
    setMetadata(image, 'blur', blur)

    return image.blur(blur)
  }
}
