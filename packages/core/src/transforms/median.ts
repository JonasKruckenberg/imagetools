import type { TransformFactory } from '../types.js'
import { invalidDirectiveValue, orFalseToDisable, parseIntegerDirective } from '../lib/parse.js'

export interface MedianOptions {
  median: string
}

/** The size range accepted by sharp's `median` operation. */
const MEDIAN_SIZE_RANGE = orFalseToDisable('an integer between 1 and 1000')

/**
 * Parses a `median` directive value. Returns `undefined` when the directive is
 * absent or disabled with `"false"`, and throws for anything that is not an
 * integer size between 1 and 1000.
 */
export function parseMedian(median: string | undefined): number | undefined {
  if (median === undefined || median === 'false') return undefined
  const value = parseIntegerDirective('median', median, MEDIAN_SIZE_RANGE)
  if (value === undefined || value < 1 || value > 1000) {
    throw invalidDirectiveValue('median', median, MEDIAN_SIZE_RANGE)
  }
  return value
}

export const median: TransformFactory<MedianOptions> = ({ median: medianDirective }) => {
  const median = parseMedian(medianDirective)

  if (!median) return

  return function medianTransform(state, image) {
    state.transforms.median = median
    return image.median(median)
  }
}
