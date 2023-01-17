import { Sharp } from 'sharp'

export type ImageConfig = Record<string, unknown>

export interface TransformFactoryContext {
  useParam: (parameter: string) => void
  warn: (message: string) => void
}

export type TransformFactory<A = Record<string, unknown>> = (
  metadata: Partial<ImageConfig & A>,
  ctx: TransformFactoryContext
) => ImageTransformation | undefined

export type TransformOption<A = Record<string, unknown>, T = unknown> = (
  metadata: Partial<ImageConfig & A>,
  image: Sharp
) => T | undefined

export type ImageTransformation = (image: Sharp) => Sharp | Promise<Sharp>

export interface TransformResult {
  image: Sharp
  metadata: Record<string, unknown>
}

/**
 * The JS object returned by the image import.
 */
export type OutputFormat = (args?: string[]) => (metadata: ImageConfig[]) => unknown

/**
 * The source output format.
 * Can be used to dynamically construct a sourceset string when you need to
 * choose between width descriptor, pixel density descriptor, or no descriptor.
 */
export interface Source {
  src: string
  w: number
}

/**
 * The picture output format.
 */
export interface Picture {
  sources: Record<string, Source[]>
  fallback: {
    src: string
    w: number
    h: number
  }
}
