import { Directive } from "../types"
import { background as getBackground } from './background'

export interface RotateOptions {
    rotate: string
    background: string
}

/**
 * Rotate the image by the specified number of degrees.
 * 
 * > NOTE: You can change the background color the empty parts are filled with by setting the [background](#background) directive.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg`rotate=90'
 * import Image from 'example.jpg`rotate=68'
 * import Images from 'example.jpg`rotate=90;180;270'
 * ```
 * 
 * @name Rotate
 * @category Import Directives
 * @keyword `rotate`
 * @type _integer^_
 */
export const rotate: Directive<RotateOptions> = (ctx, { useParam, setMetadata }) => {
    const degrees = parseInt(ctx.rotate || '')    

    if (isNaN(degrees)) return null

    useParam('rotate')
    setMetadata('rotate', degrees)

    const background = getBackground(ctx,{ useParam, setMetadata }) || undefined

    return function rotateTransform(image) {
        return image.rotate(degrees, { background })
    }
}