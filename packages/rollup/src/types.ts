import { TransformFactory, OutputFormat, resolveConfigs } from 'imagetools-core'

export interface RollupPluginOptions {
  /**
   * Which paths to include when processing images.
   * @default '**\/*.\{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif\}?*'
   */
  include: Array<string | RegExp> | string | RegExp
  /**
   * What paths to exclude when processing images.
   * @default ''
   */
  exclude: Array<string | RegExp> | string | RegExp

  /**
   * This option allows you to specify directives that should be applied _by default_ to every image.
   * You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives.
   * This can be used to define all sorts of shorthands or presets.
   *
   * @example
   * ```js
   * import { imagetools } from 'vite-imagetools'
   *
   * export default {
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
   * }
   * ```
   */
  defaultDirectives?: URLSearchParams | ((url: URL) => URLSearchParams)

  /**
   * You can use this option to extend the builtin list of import transforms.
   * This list will be merged with the builtin transforms before applying them to the input image.
   * @default []
   */
  extendTransforms?: (builtins: TransformFactory[]) => TransformFactory[]

  /**
   * You can use this option to extend the builtin list of output formats.
   * This list will be merged with the builtin output formats before determining the format to use.
   * @default []
   */
  extendOutputFormats?: (builtins: Record<string, OutputFormat>) => Record<string, OutputFormat>

  /**
   * You can use this option to override the resolution of configs based on the url parameters
   * @default undefined
   */
  resolveConfigs?: typeof resolveConfigs

  /**
   * @deprecated This option has no effect. Logging is done through Rollup's warning facilities.
   */
  silent?: boolean

  /**
   * Wether to remove potentially private metadata from the image, such as exif tags etc.
   * @default true
   */
  removeMetadata: boolean
}
