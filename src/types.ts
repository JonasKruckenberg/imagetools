import {
  ResizeOptions,
  JpegOptions,
  PngOptions,
  WebpOptions,
  AvifOptions,
  TiffOptions,
  GifOptions,
  HeifOptions,
  Sharp
} from 'sharp'

export interface GTarget extends ResizeOptions {
  transform?: (sharp: Sharp, format: Target['format']) => Sharp
  fileName?: string
}

export interface JpegTarget extends GTarget, JpegOptions {
  format: 'jpeg'
}

export interface PngTarget extends GTarget, PngOptions {
  format: 'png'
}

export interface WebpTarget extends GTarget, WebpOptions {
  format: 'webp'
}

export interface AvifTarget extends GTarget, AvifOptions {
  format: 'avif'
}

export interface TiffTarget extends GTarget, TiffOptions {
  format: 'tiff'
}

export interface GifTarget extends GTarget, GifOptions {
  format: 'gif'
}

export interface HeifTarget extends GTarget, HeifOptions {
  format: 'heif'
}

export type Target =
  | JpegTarget
  | PngTarget
  | WebpTarget
  | AvifTarget
  | TiffTarget
  | GifTarget
  | HeifTarget

export interface Options {
  /**
   * Files to include in the processing
   * @default ["**\/*.png", "**\/*.jpg", "**\/*.jpeg", "**\/*.gif"]
   */
  include?: Array<string | RegExp> | string | RegExp | null
  /**
   * Files to exclude
   * @default ""
   */
  exclude?: Array<string | RegExp> | string | RegExp | null

  /**
   *
   */
  targets?: Target[]

  cachePath?: string
}
