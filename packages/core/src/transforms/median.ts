import type { TransformFactory } from '../types.js'

export interface MedianOptions {
  median: string
}

export const median: TransformFactory<MedianOptions> = (config, ctx) => {
  const median = config.median ? parseInt(config.median) : undefined

  if (!median) return

  ctx.useParam('median')

  return function medianTransform(state, image) {
    state.transforms.median = median
    return image.median(median)
  }
}
