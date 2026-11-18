import type { ImageTransformation, ImageConfig, TransformFactory, TransformFactoryContext, Logger } from '../types.js'
import { consoleLogger } from './logger.js'

/**
 * Creates the transforms for an image config.
 *
 * Also returns `parametersUsed`: the directives the factories acted on, as
 * reported through `useParam`. The built-ins report a directive when the
 * transform they generate reads it, or when it is an opt-out such as
 * `noAutoOrient`. So a directive is left out when nothing reads it (`?widht=300`),
 * when the transform that would read it isn't generated (`?fit=cover` without a
 * size), or when its value turns the transform off (`?blur=0`). Values are not
 * validated: `?w=300&fit=bogus` reports `fit`. `basePixels` is read by the
 * output formats rather than by a transform, so it is never reported.
 * @param config The directives for a single image.
 * @param factories The transform factories to run, usually `builtins`.
 * @param manualSearchParams The directives as written in the import.
 * @param logger Receives the factories' messages; defaults to the console.
 * @returns The transforms to apply, and the directives the factories acted on.
 */
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
