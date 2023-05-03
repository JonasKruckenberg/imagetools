import { Sharp } from 'sharp'

export type ImageConfig = Record<string, unknown>

export interface Logger {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
}

export interface TransformFactoryContext {
  useParam: (parameter: string) => void
  manualSearchParams: URLSearchParams
  logger: Logger
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
 * The img output format.
 */
export interface Img {
  src: string
  /**
   * The intrinsic width
   */
  w: number
  /**
   * The intrinsic height. May not be the rendered height.
   * Helps prevent reflow. See https://html.com/attributes/img-height/
   */
  h: number
  srcset?: Source[]
}

/**
 * The picture output format.
 */
export interface Picture {
  sources: Record<string, Source[]>
  img: {
    src: string
    w: number
    h: number
  }
}
