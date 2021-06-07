import { ImageTransformFactory, DefaultTarget } from "imagetools-core";

export interface PluginOptions {
    /** 
     * Which paths to include when processing images.
     * @default '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
    */
    include: Array<string | RegExp> | string | RegExp
    /** 
     * What paths to exclude when processing images.
     * @default ''
    */
    exclude: Array<string | RegExp> | string | RegExp

    /**
     * This option allows you to specify directives that should be applied _by default_ to every image.
     * You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives
     */
     defaultDirectives?: DefaultTarget
     
    /**
     * You can use this option to extend the builtin list of import transforms.
     * This list will be merged with the builtin transforms before applying them to the input image.
     * @default []
     */
    extendTransforms?: (builtins: ImageTransformFactory[]) => ImageTransformFactory[]

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
}