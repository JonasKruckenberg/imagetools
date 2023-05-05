import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface HSBOptions {
  hue: string
  saturation: string
  brightness: string
}

export const hsb: TransformFactory<HSBOptions> = (config) => {
  const hue = config.hue && parseInt(config.hue)
  const saturation = config.saturation && parseFloat(config.saturation)
  const brightness = config.brightness && parseFloat(config.brightness)

  if (!hue && !saturation && !brightness) return

  return function hsbTransform(image) {
    setMetadata(image, 'hue', hue)
    setMetadata(image, 'saturation', saturation)
    setMetadata(image, 'brightness', brightness)

    return image.modulate({
      hue: hue || 0,
      saturation: saturation || 1,
      brightness: brightness || 1
    })
  }
}
