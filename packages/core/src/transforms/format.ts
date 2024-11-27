import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'
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

  return function formatTransform(image) {
    image[METADATA].format = format

    return image.toFormat(format, {
      compression: format == 'heif' ? 'av1' : undefined,
      effort: getEffort(config, image),
      lossless: getLossless(config, image) as boolean,
      // @ts-expect-error not every image type supports progressive
      progressive: getProgressive(config, image) as boolean,
      quality: getQuality(config, image)
    })
  }
}
