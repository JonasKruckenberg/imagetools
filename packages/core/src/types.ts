import { Sharp } from 'sharp'

export type ImageConfig = Record<string, unknown>

export interface TransformFactoryContext {
  useParam: (parameter: string) => void
  warn: (message: string) => void
}

export type TransformFactory<A = Record<string,unknown>> = (
  metadata: Partial<ImageConfig & A>,
  ctx: TransformFactoryContext
) => ImageTransformation | undefined

export type TransformOption<A = Record<string,unknown>, T = unknown> = (metadata: Partial<ImageConfig & A>, image: Sharp) => T | undefined

export type ImageTransformation = (image: Sharp) => Sharp | Promise<Sharp>

export interface TransformResult {
  image: Sharp
  metadata: Record<string, unknown>
}

export type OutputFormat = (args?: string[]) => (metadata: ImageConfig[]) => unknown
