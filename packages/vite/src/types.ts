import type { TransformFactory, OutputFormat, resolveConfigs } from 'imagetools-core'
import type { Metadata } from 'sharp'

type MaybePromise<T> = T | Promise<T>

export type Include = Array<string | RegExp> | string | RegExp

export type Exclude = Array<string | RegExp> | string | RegExp

export type DefaultDirectives =
  | URLSearchParams
  | ((url: URL, metadata: () => MaybePromise<Metadata>) => MaybePromise<URLSearchParams>)

export type ExtendTransforms = (builtins: TransformFactory[]) => TransformFactory[]

export type ExtendOutputFormats = (builtins: Record<string, OutputFormat>) => Record<string, OutputFormat>

export type ResolveConfigs = typeof resolveConfigs

export interface VitePluginOptions {
  /**
   * Which paths to include when processing images.
   * @default '**\/*.\{heif,avif,jpeg,jpg,png,tiff,webp,gif\}?*'
   */
  include: Include
  /**
   * What paths to exclude when processing images.
   * This defaults to the public dir to mirror vites behavior.
   * @default 'public\/**\/*'
   */
  exclude: Exclude

  /**
   * This option allows you to specify directives that should be applied _by default_ to every image.
   * You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives.
   * This can be used to define all sorts of shorthands or presets.
   *
   * @example
   * ```js
   * import { defineConfig } from 'vite'
   * import { imagetools } from 'vite-imagetools'
   *
   * export default defineConfig({
   *  plugins: [
   *    imagetools({
   *       defaultDirectives: (url) => {
   *        if (url.searchParams.has('spotify')) {
   *           return new URLSearchParams({
   *             tint: 'ffaa22'
   *           })
   *         }
   *         return new URLSearchParams()
   *       }
   *     })
   *    ]
   * })
   * ```
   */
  defaultDirectives?: DefaultDirectives

  /**
   * You can use this option to extend the builtin list of import transforms.
   * This list will be merged with the builtin transforms before applying them to the input image.
   * @default []
   */
  extendTransforms?: ExtendTransforms

  /**
   * You can use this option to extend the builtin list of output formats.
   * This list will be merged with the builtin output formats before determining the format to use.
   * @default []
   */
  extendOutputFormats?: ExtendOutputFormats

  /**
   * You can use this option to override the resolution of configs based on the url parameters
   * @default undefined
   */
  resolveConfigs?: ResolveConfigs

  /**
   * Whether to remove potentially private metadata from the image, such as exif tags etc.
   * @default true
   */
  removeMetadata: boolean

  /**
   * Whether to generate named exports.
   * Takes precedence over Vite's `json.namedExports`
   * @default undefined
   */
  namedExports?: boolean

  /**
   * Whether to cache transformed images and options for caching.
   */
  cache?: CacheOptions
}

export interface CacheOptions {
  /**
   * Should the image cache be enabled. Default is true
   */
  enabled?: boolean

  /**
   * Where should the cached images be stored. Default is './node_modules/.cache/imagetools'
   */
  dir?: string

  /**
   * For how many seconds to keep transformed images cached. Default is undefined, which keeps the images forever.
   */
  retention?: number
}
