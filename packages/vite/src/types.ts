import { Directive } from "imagetools-core/dist/types";

export interface PluginOptions {
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
     * The path to use as the cache for images, set this option to false to disable caching completely.
     * @default 'node_modules/.cache/vite-imagetools'
    */
    cache: string | false

    /**
     * You can use this option to extend the builtin list of import directives.
     * This list will be merged with the builtin directives before applying them to the input image.
     * @default []
     */
    directives: Directive[]

    /**
     * You can use this option to extend the builtin list of output formats.
     * This list will be merged with the builtin output formats before determining the format to use.
     * @default []
     */
    // outputFormats: OutputFormat[]

    /**
     * By default vite-imagetools only generates output metadata during development mode
     * and only generates the actual images in build mode.
     * You can set this option to `true` to override this behaviour.
     * @default false
     */
    force: boolean

    /**
     * Settings this option to true disables all warnings produced by this plugin
     * @default false
     */
    silent: boolean
}