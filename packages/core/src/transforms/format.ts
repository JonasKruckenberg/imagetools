import type { TransformFactory } from '../types.js'
import { getEffort } from './effort.js'
import { getQuality } from './quality.js'
import { getProgressive } from './progressive.js'
import { getLossless } from './lossless.js'
import { formatValues } from '../lib/values.js'
import { formatExpected, invalidDirectiveValue, orFalseToDisable } from '../lib/parse.js'
import type { FormatEnum } from 'sharp'

export { formatValues } from '../lib/values.js'

export type FormatValue = (typeof formatValues)[number]

export interface FormatOptions {
  format: FormatValue | 'false'
}

function parseFormat(format: string | undefined): FormatValue | undefined {
  if (format === undefined) return undefined
  if (format === 'false') return undefined
  if (!formatValues.includes(format as FormatValue)) {
    throw invalidDirectiveValue('format', format, orFalseToDisable(`one of ${formatExpected(formatValues)}`))
  }
  return format as FormatValue
}

export const format: TransformFactory<FormatOptions> = (config) => {
  const parsedFormat = parseFormat(config.format)

  if (parsedFormat === undefined) return

  return function formatTransform(state, image) {
    state.transforms.format = parsedFormat

    const effort = getEffort(config, state)
    const lossless = getLossless(config, state)
    const progressive = getProgressive(config, state)
    const quality = getQuality(config, state)

    // sharp's `FormatEnum` type omits the aliases sharp accepts at runtime
    // (like `jpg`, `tif` and `heic`), so cast after validating against `formatValues`
    return image.toFormat(parsedFormat as keyof FormatEnum, {
      compression: parsedFormat == 'heif' ? 'av1' : undefined,
      effort,
      lossless,
      progressive,
      // sharp rejects a quality of 0 for most formats, so let 0 fall back to the default
      quality: quality || undefined
    })
  }
}
