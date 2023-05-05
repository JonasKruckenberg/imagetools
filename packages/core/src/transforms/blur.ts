import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface BlurOptions {
  blur: string
}

export const blur: TransformFactory<BlurOptions> = (config) => {
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
