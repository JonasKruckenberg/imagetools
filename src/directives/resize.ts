import { Directive } from "../types"
import { background as getBackground } from './background'
import { fit as getFit } from './fit'
import { position as getPosition } from './position'
import { kernel as getKernel } from './kernel'

export interface ResizeOptions {
    height: string
    h: string
    width: string
    w: string
}

/**
 * Resizes the image to be the specified amount of pixels wide. 
 * If not given the height will be scaled accordingly.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?width=200'
 * import Image from 'examepl.jpg?w=200'
 * import Images from 'examepl.jpg?width=200;400;700'
 * ```
 * 
 * @name Width
 * @category Import Directives
 * @keyword `width` \| `w`
 * @type _integer_
 */
/**
 * Resizes the image to be the specified amount of pixels tall. 
 * If not given the width will be scaled accordingly.
 * 
 * @example
 * ```js
 * import Image from 'example.jpg?height=200'
 * import Image from 'examepl.jpg?h=200'
 * import Images from 'examepl.jpg?height=200;400;700'
 * ```
 * 
 * @name Height
 * @category Import Directives
 * @keyword `height` \| `h`
 * @type _integer_
 */
export const resize: Directive<ResizeOptions> = (opts, { useParam, setMetadata }) => {
    const width = parseInt(opts.width || opts.w || '') || undefined
    const height = parseInt(opts.height || opts.h || '') || undefined

    if (!width && !height) return null

    if (width) {
        useParam('width')
        setMetadata('width', width)
    }

    if (height) {
        useParam('height')
        setMetadata('height', height)
    }

    const background = getBackground(opts,{ useParam, setMetadata }) || undefined
    const fit = getFit(opts,{ useParam, setMetadata }) || undefined
    const position = getPosition(opts,{ useParam, setMetadata }) || undefined
    const kernel = getKernel(opts, { useParam, setMetadata }) || undefined

    return function resizeTransform(image) {
        return image.resize({
            width,
            height,
            background,
            fit,
            position,
            kernel
        })
    }
}