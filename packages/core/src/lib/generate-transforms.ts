import type { ImageTransformation, ImageConfig, TransformFactory, TransformFactoryContext, Logger } from '../types.js'
import { consoleLogger } from './logger.js'

export function generateTransforms(
  config: ImageConfig,
  factories: TransformFactory[],
  manualSearchParams: URLSearchParams,
  logger?: Logger
) {
  if (logger === undefined) {
    logger = consoleLogger
  }

  const transforms: ImageTransformation[] = []
  const parametersUsed = new Set<string>()

  const context: TransformFactoryContext = {
    useParam: (k) => parametersUsed.add(k),
    manualSearchParams,
    logger
  }

  for (const directive of factories) {
    const transform = directive(config, context)

    if (typeof transform === 'function') transforms.push(transform)
  }

  return {
    transforms,
    parametersUsed
  }
}
