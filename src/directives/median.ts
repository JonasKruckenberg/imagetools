import { Directive } from "../types";

interface MedianOptions {
    median: string
}

/**
 * Applies a median filter. This is commonly used to remove noise from images.
 * 
 * @example
 * ```js
 *   import Image from 'example.jpg?median'
 *   import Image from 'exmaple.jpg?median=3'
 *   import Image from 'example.jpg?median=50'
 * ```
 * 
 * @name Median
 * @category "Import Directives"
 * @keyword `median`
 * @type _float_ \| _boolean_
 */
export const median: Directive<MedianOptions> = ({ median: _median }, ctx) => {
    const median = parseFloat(_median || '')

    if(!median) return null

    ctx.useParam('median')
    ctx.setMetadata('median', median)

    return function medianTransform(image) {
        return image.median(median)
    }
}