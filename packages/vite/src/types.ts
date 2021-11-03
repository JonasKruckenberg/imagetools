import { TransformFactory, OutputFormat } from 'imagetools-core'

export interface VitePluginOptions {
  /**
   * Which paths to include when processing images.
   * @default '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
   */
  include: Array<string | RegExp> | string | RegExp
  /**
   * What paths to exclude when processing images.
   * This defaults to the public dir to mirror vites behavior.
   * @default 'public\/**\/*'
   */
  exclude: Array<string | RegExp> | string | RegExp

  /**
   * This option allows you to specify directives that should be applied _by default_ to every image.
   * You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives
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
   * Settings this option to true disables all warnings produced by this plugin
   * @default false
   */
  silent: boolean

  /**
   * Wether to remove potentially private metadata from the image, such as exif tags etc.
   * @default true
   */
  removeMetadata: boolean

  /**
   * This option used to enable the plugin during development mode. This option is no longer required!
   * @deprecated
   */
  force?: boolean
}
