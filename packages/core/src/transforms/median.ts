import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface MedianOptions {
  median: string
}

export const median: TransformFactory<MedianOptions> = (config) => {
  const median = config.median ? parseInt(config.median) : undefined

  if (!median) return

  return function medianTransform(image) {
    image[METADATA].median = median

    return image.median(median)
  }
}
