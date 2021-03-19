import { Directive, ImageConfig } from "imagetools-core/dist/types";

export type OutputFormat = (metadata: ImageConfig[]) => any

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
     * You can use this option to extend the builtin list of import directives.
     * This list will be merged with the builtin directives before applying them to the input image.
     * @default []
     */
    extendDirectives?: (builtins: Directive[]) => Directive[]

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
}