import type { TransformFactory } from '../types.js'
import { orFalseToDisable, parseFloatDirective, parseIntegerDirective } from '../lib/parse.js'

export interface HSBOptions {
  hue: string
  saturation: string
  brightness: string
}

export const hsb: TransformFactory<HSBOptions> = (config) => {
  const hue = parseIntegerDirective('hue', config.hue, orFalseToDisable('an angle in degrees'))
  const saturation = parseFloatDirective('saturation', config.saturation, orFalseToDisable('a number'))
  const brightness = parseFloatDirective('brightness', config.brightness, orFalseToDisable('a number'))

  if (!hue && !saturation && !brightness) return

  return function hsbTransform(state, image) {
    state.transforms.hue = hue
    state.transforms.saturation = saturation
    state.transforms.brightness = brightness
    return image.modulate({
      hue: hue || 0,
      saturation: saturation || 1,
      brightness: brightness || 1
    })
  }
}
