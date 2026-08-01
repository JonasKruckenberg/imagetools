import type { TransformFactory } from '../types.js'
import { getEffort } from './effort.js'
import { getQuality } from './quality.js'
import { getProgressive } from './progressive.js'
import { getLossless } from './lossless.js'
import type { FormatEnum } from 'sharp'

export interface FormatOptions {
  format: keyof FormatEnum
}

export const format: TransformFactory<FormatOptions> = (config) => {
  let format: keyof FormatEnum

  if (!config.format) {
    return
  } else {
    format = config.format
  }

  return function formatTransform(state, image) {
    state.transforms.format = format

    return image.toFormat(format, {
      compression: format == 'heif' ? 'av1' : undefined,
      effort: getEffort(config, state),
      lossless: getLossless(config, state) as boolean,
      progressive: getProgressive(config, state) as boolean,
      quality: getQuality(config, state)
    })
  }
}
