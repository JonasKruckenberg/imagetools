import type { Metadata, Sharp } from 'sharp'
import { kernelValues } from './transforms/kernel.js'
import { positionValues } from './transforms/position.js'

export interface ProcessedImageMetadata extends ImageMetadata {
  src: string
  image: Sharp
}

export interface ImageMetadata extends Metadata {
  allowUpscale?: boolean
  aspect?: number | undefined
  backgroundDirective?: string
  blur?: number | boolean | undefined
  brightness?: number | '' | undefined
  fit?: string
  flip?: true
  flop?: true
  flatten?: true
  hue?: number | '' | undefined
  invert?: true
  grayscale?: true
  kernel?: (typeof kernelValues)[number]
  lossless?: true
  median?: number
  normalize?: true
  pixelDensityDescriptor?: string | undefined
  position?: (typeof positionValues)[number]
  progressive?: true
  quality?: number
  saturation?: number | '' | undefined
  tint?: string
  rotate?: number
  [key: string]: unknown
}

export type ImageConfig = Record<string, string | string[]>

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
  metadata: ImageMetadata
}

/**
 * The JS object returned by the image import.
 */
export type OutputFormat = (args?: string[]) => (metadata: ProcessedImageMetadata[]) => unknown

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
  srcset?: string
}

/**
 * The picture output format.
 */
export interface Picture {
  /**
   * Key is format. Value is srcset.
   */
  sources: Record<string, string>
  img: {
    src: string
    w: number
    h: number
  }
}
