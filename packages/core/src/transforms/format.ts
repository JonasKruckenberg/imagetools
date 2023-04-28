import { TransformFactory } from '../types'
import { setMetadata } from '../lib/metadata'
import { getQuality } from './quality'
import { getProgressive } from './progressive'
import { FormatEnum } from 'sharp'

export const formatValues = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff'] as const

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

  const fixedFormat: keyof FormatEnum = format as any

  return function formatTransform(image) {
    setMetadata(image, 'format', format)

    return image.toFormat(fixedFormat, {
      quality: getQuality(config, image),
      progressive: getProgressive(config, image) as boolean
    })
  }
}
