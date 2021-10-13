import { ImageTransformation, ImageConfig, TransformFactory, TransformFactoryContext } from '../types'

export function generateTransforms(config: ImageConfig, factories: TransformFactory[]) {
  const transforms: ImageTransformation[] = []
  const parametersUsed = new Set<string>()
  const warnings: string[] = []

  const context: TransformFactoryContext = {
    useParam: (k) => parametersUsed.add(k),
    warn: (m) => warnings.push(m)
  }

  for (const directive of factories) {
    const transform = directive(config, context)

    if (typeof transform === 'function') transforms.push(transform)
  }

  return {
    transforms,
    parametersUsed,
    warnings
  }
}
