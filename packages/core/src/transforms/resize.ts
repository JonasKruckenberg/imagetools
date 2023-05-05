import { getMetadata, setMetadata } from '../lib/metadata.js'
import { TransformFactory } from '../types.js'
import { getBackground } from './background.js'
import { getFit } from './fit.js'
import { getKernel } from './kernel.js'
import { getPosition } from './position.js'

export interface ResizeOptions {
  w: string
  h: string
  aspect: string
  allowUpscale: '' | 'true'
}

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
    const [width, height] = parts.map((str) => parseInt(str))

    if (!width || !height) return undefined

    aspectRatio = width / height
  }
  if (!aspectRatio || aspectRatio <= 0) return undefined
  return aspectRatio
}

export const resize: TransformFactory<ResizeOptions> = (config, context) => {
  const width = parseInt(config.w || '')
  const height = parseInt(config.h || '')
  const aspect = parseAspect(config.aspect || '')
  const allowUpscale = config.allowUpscale === '' || config.allowUpscale === 'true'

  if (!width && !height && !aspect) return

  return function resizeTransform(image) {
    const fit = getFit(config, image)
    // calculate finalWidth & finalHeight
    const originalWidth = getMetadata(image, 'width')
    const originalHeight = getMetadata(image, 'height')
    const originalAspect = originalWidth / originalHeight

    let finalWidth = width,
      finalHeight = height,
      finalAspect = aspect

    if (aspect && !width && !height) {
      // only aspect was given, need to calculate which dimension to crop
      if (aspect > originalAspect) {
        finalHeight = originalWidth / aspect
        finalWidth = originalWidth
      } else {
        finalHeight = originalHeight
        finalWidth = originalHeight / aspect
      }
    } else if (width && height) {
      // width & height BOTH given, need to look at fit
      switch (fit) {
        case 'inside':
          if (width / height < originalAspect) {
            finalHeight = width / originalAspect
          } else {
            finalWidth = height * originalAspect
          }
          break
        case 'outside':
          if (width / height > originalAspect) {
            finalHeight = width / originalAspect
          } else {
            finalWidth = height * originalAspect
          }
          break
        case 'cover':
        case 'contain':
        case 'fill':
        default:
          // no recalculation necessary
          break
      }
      finalAspect = finalWidth / finalHeight
    } else if (!height) {
      // only width was provided, need to calculate height
      finalAspect = aspect || originalAspect
      finalHeight = width / finalAspect
    } else if (!width) {
      // only height was provided, need to calculate width
      finalAspect = aspect || originalAspect
      finalWidth = height * finalAspect
    }

    if (!allowUpscale && (finalHeight > originalHeight || finalWidth > originalWidth)) {
      finalHeight = originalHeight
      finalWidth = originalWidth
      finalAspect = originalAspect

      if (context.manualSearchParams.has('width') || context.manualSearchParams.has('height')) {
        context.logger.info(
          'allowUpscale not enabled. Image width, height and aspect ratio reverted to original values'
        )
      }
    }

    finalWidth = Math.round(finalWidth)
    finalHeight = Math.round(finalHeight)

    setMetadata(image, 'height', finalHeight)
    setMetadata(image, 'width', finalWidth)
    setMetadata(image, 'aspect', finalAspect)
    setMetadata(image, 'allowUpscale', allowUpscale)

    return image.resize({
      width: finalWidth || undefined,
      height: finalHeight || undefined,
      withoutEnlargement: !allowUpscale,
      fit,
      position: getPosition(config, image),
      kernel: getKernel(config, image),
      background: getBackground(config, image)
    })
  }
}
