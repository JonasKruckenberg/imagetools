import { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'
import { getQuality } from './quality.js'
import { getProgressive } from './progressive.js'
import { getLossless } from './lossless.js'
import { FormatEnum } from 'sharp'

export const formatValues = ['avif', 'heif', 'jpeg', 'jpg', 'png', 'tiff', 'webp'] as const

export type FormatValue = (typeof formatValues)[number]

export interface FormatOptions {
  format: FormatValue
}

export const format: TransformFactory<FormatOptions> = (config) => {
  let format: FormatValue | undefined = undefined

  if (config.format && formatValues.includes(config.format)) {
    format = config.format
  }
  if (!format) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fixedFormat: keyof FormatEnum = format as any

  return function formatTransform(image) {
    image[METADATA].format = format

    return image.toFormat(fixedFormat, {
      quality: getQuality(config, image),
      lossless: getLossless(config, image) as boolean,
      progressive: getProgressive(config, image) as boolean
    })
  }
}
