import type { Metadata, Sharp } from 'sharp'
import type { kernelValues, positionValues } from './lib/values.js'

/**
 * Properties describing the image as it flows through the pipeline.
 * Initialized from the source file and updated by transforms.
 */
export interface ImageInfo {
  /** The width of the image in pixels. */
  width: number
  /** The height of the image in pixels. */
  height: number
  /** The dimensions of the image once its EXIF orientation is applied. */
  autoOriented: { width: number; height: number }
}

/**
 * The values applied by each transform during the pipeline run, mirroring the
 * options available as image query parameters. Only the transforms that were
 * applied record a value.
 */
export interface AppliedTransforms {
  format?: string
  allowUpscale?: boolean
  aspect?: number
  backgroundDirective?: string
  blur?: number | boolean
  brightness?: number | ''
  fit?: string
  flip?: true
  flop?: true
  flatten?: true
  hue?: number | ''
  invert?: true
  grayscale?: true
  kernel?: (typeof kernelValues)[number]
  lossless?: true
  median?: number
  normalize?: true
  position?: (typeof positionValues)[number]
  progressive?: true
  quality?: number
  saturation?: number | ''
  tint?: string
  rotate?: number
  effort?: number
}

/**
 * The state threaded through the transform pipeline and returned by `applyTransforms`.
 */
export interface ImageMetadata {
  info: ImageInfo
  transforms: AppliedTransforms
}

/**
 * A processed image, ready to be consumed by an output format: the pipeline
 * `ImageMetadata`, the source Sharp metadata, the URL, config and sharp instance
 * that produced it.
 */
export interface ProcessedImage extends ImageMetadata {
  /** The URL of the image. */
  src: string
  /** The sharp instance of the processed image. */
  image: Sharp
  /** The directives used to generate this image. */
  config: ImageConfig
  /**
   * The sharp metadata of the processed image, read from the encoded output,
   * so it is identical whether the image came from a cache hit or a fresh
   * process.
   */
  sharpMetadata: Metadata
}

/**
 * The directives for a single image. Each value is resolved to a single string
 * by the cartesian product computed in `resolveConfigs`, so consumers never have
 * to handle array values.
 */
export type ImageConfig = Record<string, string>

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

/**
 * Creates an `ImageTransformation` from the parsed directives, or returns
 * `undefined` to skip the transform for this run.
 */
export type TransformFactory<A = Record<string, unknown>> = (
  metadata: Partial<ImageConfig & A>,
  ctx: TransformFactoryContext
) => ImageTransformation | undefined

/**
 * Reads a transform value from the parsed directives and the threaded state,
 * recording the applied value on `state.transforms` when present.
 */
export type TransformOption<A = Record<string, unknown>, T = unknown> = (
  metadata: Partial<ImageConfig & A>,
  state: ImageMetadata
) => T | undefined

/**
 * A single step of the pipeline: reads from and writes to the threaded
 * `ImageMetadata`, and returns the image to continue processing.
 */
export type ImageTransformation = (state: ImageMetadata, image: Sharp) => Sharp | Promise<Sharp>

/**
 * The JS object returned by the image import.
 */
export type OutputFormat = (args?: string[]) => (metadata: ProcessedImage[]) => unknown

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
