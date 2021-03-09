import { Directive } from "../types";

interface BlurOptions {
    blur: string
}

/**
 * Blurs the image. When no argument is provided it performs a fast blur.
 * When an argument between 0.3 and 1000 is provided it performs a more accurate gaussian blur.
 * 
 * @example
 * ```js
 *   import Image from 'example.jpg?blur'
 *   import Image from 'exmaple.jpg?blur=0.75'
 *   import Image from 'example.jpg?blur=100'
 * ```
 * 
 * @name Blur
 * @category "Import Directives"
 * @keyword `blur`
 * @type _float_ \| _boolean_
 */
export const blur: Directive<BlurOptions> = ({ blur: _blur }, ctx) => {
    const blur = parseFloat(_blur || '') || _blur === '' || _blur === 'true'

    if(!blur || typeof blur === 'number' && (blur < 0.3 || blur > 1000)) return null

    ctx.useParam('blur')
    ctx.setMetadata('blur', blur)

    return function blurTransform(image) {
        return image.blur(blur)
    }
}