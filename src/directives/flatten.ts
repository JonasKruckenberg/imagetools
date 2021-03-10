import { Directive } from "../types";
import { background as getBackground } from './background'

export interface FlattenOptions {
    flatten: ''
    background: string
}

/**
 * This directive will remove the aplha channel of the image, reducing filesize.
 * Transparent pixels will be merged with the color set by the [background directive](#background).
 * 
 * @name Flatten
 * @category "Import Directives"
 * @keyword `flatten`
 * @type _boolean_
 */
export const flatten: Directive<FlattenOptions> = (opts, ctx) => {
    const background = getBackground(opts,ctx) || undefined

    if (opts.flatten !== '') return null

    return function flattenTransform(image) {
        return image.flatten({
            background
        })
    }
}