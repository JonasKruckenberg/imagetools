import { getMetadata, setMetadata } from '../lib/metadata'
import { TransformFactory } from '../types'
import { getBackground } from './background'
import { getFit } from './fit'
import { getKernel } from './kernel'
import { getPosition } from './position'

export interface ResizeOptions {
  width: string
  w: string
  height: string
  h: string
  aspect: string
  ar: string
  withoutEnlargement: '' | 'true'
  withoutReduction: '' | 'true'
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
  const width = parseInt(config.width || config.w || '')
  const height = parseInt(config.height || config.h || '')
  const aspect = parseAspect(config.aspect || config.ar || '')
  const withoutEnlargement = config.withoutEnlargement === '' || config.withoutEnlargement === 'true'
  const withoutReduction = config.withoutReduction === '' || config.withoutReduction === 'true'

  if (
    (!width && !height && !aspect) ||
    (config.withoutEnlargement && !withoutEnlargement) ||
    (config.withoutReduction && !withoutReduction)
  )
    return

  return function resizeTransform(image) {
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
    } else if (!height) {
      // only width was provided, need to calculate height

      finalHeight = width / (aspect || originalAspect)
    } else if (!width) {
      /* only height was provided, need to calculate width */
      finalWidth = height * (aspect || originalAspect)
    }

    if (
      (withoutEnlargement && (finalHeight > originalHeight || finalWidth > originalWidth)) ||
      (withoutReduction && (finalHeight < originalHeight || finalWidth < originalWidth))
    ) {
      finalHeight = originalHeight
      finalWidth = originalWidth
      finalAspect = originalAspect

      context.logger.info(
        'withoutEnlargement or withoutReduction enabled. Image width, height and aspect ratio reverted to original values'
      )
    }

    setMetadata(image, 'height', finalHeight)
    setMetadata(image, 'width', finalWidth)
    setMetadata(image, 'aspect', finalAspect)
    setMetadata(image, 'withoutEnlargement', withoutEnlargement)
    setMetadata(image, 'withoutReduction', withoutReduction)

    return image.resize({
      width: Math.round(finalWidth) || undefined,
      height: Math.round(finalHeight) || undefined,
      withoutEnlargement: withoutEnlargement,
      withoutReduction: withoutReduction,
      fit: getFit(config, image),
      position: getPosition(config, image),
      kernel: getKernel(config, image),
      background: getBackground(config, image)
    })
  }
}
