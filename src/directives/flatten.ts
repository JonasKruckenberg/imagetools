import { Directive } from "../types";
import { background as getBackground } from './background'

export interface FlattenOptions {
    flatten: '' | 'true'
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
    const background = getBackground(opts, ctx) || undefined

    if (opts.flatten !== '' && opts.flatten !== 'true') return null

    ctx.useParam('flatten')
    ctx.setMetadata('flatten', true)

    return function flattenTransform(image) {
        return image.flatten({
            background
        })
    }
}