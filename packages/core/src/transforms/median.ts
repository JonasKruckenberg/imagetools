import { TransformFactory } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface MedianOptions {
  median: string
}

export const median: TransformFactory<MedianOptions> = (config) => {
  const median = config.median ? parseInt(config.median) : undefined

  if (!median) return

  return function medianTransform(image) {
    setMetadata(image, 'median', median)

    return image.median(median)
  }
}
