import type { Sharp } from 'sharp'

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
    customDirectives: Directive[]

    /**
     * You can use this option to extend the builtin list of output formats.
     * This list will be merged with the builtin output formats before determining the format to use.
     * @default []
     */
    customOutputFormats: OutputFormat[]

    /**
     * By default vite-imagetools only generates output metadata during development mode
     * and only generates the actual images in build mode.
     * You can set this option to `true` to override this behaviour.
     * @default false
     */
    force: boolean
}

/**
 * A Directive is a function that takes in the parsed parameters and returns a function that applies some transformation to the image.
 * You can also return null to indicate that you don't want to handle this specific image (i.e. this directive is not applicable).
 */
export type Directive<A = {}> = (cfg: DirectiveOptions & A, ctx: DirectiveContext) => ImageTransformation | null

/**
 * A function that takes an image applies some transformations and returns the image.
 */
export type ImageTransformation = (image: Sharp) => Sharp

export type OutputFormat = (src:URL, outputMetadatas: Record<string, any>[]) => any

export type DirectiveOptions = Record<string, any>


export interface DirectiveContext {
    /**
     * Use this function to indicate that you used some directive.
     * This is used to warn the user about unused directives.
     */
    useParam: (param: string) => void
    /**
     * Add a key value pair to the output metadata.
     * The resulting metadata object will be available when importing an image with the `?metadata` directive
     */
    setMetadata: (key: string, value: any) => void
}


export type ImageFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'
