import { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'
import { getQuality } from './quality.js'
import { getProgressive } from './progressive.js'
import { getLossless } from './lossless.js'
import { FormatEnum } from 'sharp'

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

  return function formatTransform(image) {
    image[METADATA].format = format

    return image.toFormat(format, {
      compression: format == 'heif' ? 'av1' : undefined,
      quality: getQuality(config, image),
      lossless: getLossless(config, image) as boolean,
      progressive: getProgressive(config, image) as boolean
    })
  }
}
