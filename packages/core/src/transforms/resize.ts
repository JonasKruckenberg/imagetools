import { getMetadata, setMetadata } from "../lib/metadata";
import { ImageTransformFactory } from "../types";
import { getFit } from './fit'
import { getPosition } from './position'
import { getKernel } from './kernel'
import { getBackground } from './background'

export type ResizeKeywords = 'width' | 'w' | 'height' | 'h' | 'aspect' | 'ar'


/**
 * This function parses a user provided aspect-ratio string into a float.
 * Valid syntaxes are `16:9` or `1.777`
 * @param aspect 
 * @returns 
 */
function parseAspect(aspect: string): number | undefined {
    const parts = aspect.split(':')

    let aspectRatio
    if (parts.length === 1) {
        // the string was a float        
        aspectRatio = parseFloat(parts[0])
    } else if (parts.length === 2) {
        // the string was a colon delimited aspect ratio
        const [width, height] = parts.map(str => parseInt(str));

        if (!width || !height) return undefined

        aspectRatio = width / height
    }
    if (!aspectRatio || aspectRatio <= 0) return undefined
    return aspectRatio
}

export const resize: ImageTransformFactory<ResizeKeywords | 'fit' | 'position' | 'kernel' | 'background'> = (target) => {
    const width = parseInt(target.width || target.w || '')
    const height = parseInt(target.height || target.h || '')
    const aspect = parseAspect(target.aspect || target.ar || '')

    if (!width && !height && !aspect) return

    const fit = getFit(target)
    const position = getPosition(target)
    const kernel = getKernel(target)
    const background = getBackground(target)

    return function resizeTransform(image) {
        // calculate finalWidth & finalHeight
        const originalWidth = getMetadata(image, 'width')
        const originalHeight = getMetadata(image, 'height')
        const originalAspect = originalWidth / originalHeight

        let finalWidth = width, finalHeight = height

        if (!width && !height) {
            // only aspect was given, need to calculate which dimension to crop
            const useWidth = aspect! > originalAspect

            if (aspect! > originalAspect) {
                finalHeight = originalWidth / aspect!
                finalWidth = originalWidth
            } else {
                finalHeight = originalHeight
                finalWidth = originalHeight / aspect!
            }
        } else if (!height) {
            // only width was provided, need to calculate height

            finalHeight = width! / (aspect || originalAspect)
        } else if (!width) {
            /* only height was provided, need to calculate width */
            finalWidth = height * (aspect || originalAspect)
        }

        setMetadata(image, 'height', finalHeight)
        setMetadata(image, 'width', finalWidth)
        setMetadata(image, 'aspect', aspect || originalAspect)
        setMetadata(image, 'fit', fit)
        setMetadata(image, 'position', position)
        setMetadata(image, 'kernel', kernel)
        setMetadata(image, 'background', background)

        return image.resize({
            width: Math.round(finalWidth) || undefined,
            height: Math.round(finalHeight) || undefined,
            fit,
            position,
            kernel,
            background
        })
    }
}
