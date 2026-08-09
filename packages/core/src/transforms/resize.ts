import type { TransformFactory } from '../types.js'
import {
  invalidDirectiveValue,
  orFalseToDisable,
  parseBooleanDirective,
  parseFloatDirective,
  parseIntegerDirective,
  parsePositiveIntegerDirective
} from '../lib/parse.js'
import { getBackground } from './background.js'
import { getFit } from './fit.js'
import { getKernel } from './kernel.js'
import { getPosition } from './position.js'

export interface ResizeOptions {
  /** width in pixels */
  w: string
  /** height in pixels */
  h: string
  /** aspect ratio */
  aspect: string
  /** Whether to allow making images larger. This is generally a waste, so is disabled by default. */
  allowUpscale: '' | 'true' | 'false'
  /**
   * The width in pixels for the 1x pixel density descriptor.
   * If supplied, the srcset, img and picture output formats use pixel density descriptors rather than width descriptors.
   * This is consumed when generating the output, so it can be used with or without a `w`/`h`/`aspect` directive.
   */
  basePixels: string
}

/**
 * This function parses a user provided aspect-ratio string into a float.
 * Valid syntaxes are `16:9` or `1.777`
 * @param aspect
 * @returns
 */
function parseAspect(aspect: string | undefined): number | undefined {
  if (aspect === undefined || aspect === '' || aspect === 'false') return undefined

  const parts = aspect.split(':')

  let aspectRatio
  if (parts.length === 1) {
    // the string was a float
    aspectRatio = parseFloatDirective(
      'aspect',
      parts[0],
      orFalseToDisable('a ratio such as "16:9" or a positive number')
    )
  } else if (parts.length === 2) {
    // the string was a colon delimited aspect ratio
    const width = parseIntegerDirective(
      'aspect',
      parts[0],
      orFalseToDisable('a ratio such as "16:9" or a positive number')
    )
    const height = parseIntegerDirective(
      'aspect',
      parts[1],
      orFalseToDisable('a ratio such as "16:9" or a positive number')
    )

    if (width && height) aspectRatio = width / height
  }
  if (!aspectRatio || aspectRatio <= 0) {
    throw invalidDirectiveValue('aspect', aspect, orFalseToDisable('a ratio such as "16:9" or a positive number'))
  }
  return aspectRatio
}

export const resize: TransformFactory<ResizeOptions> = (config, context) => {
  const width = parsePositiveIntegerDirective('w', config.w, orFalseToDisable('a positive width in pixels')) ?? 0
  const height = parsePositiveIntegerDirective('h', config.h, orFalseToDisable('a positive height in pixels')) ?? 0
  const aspect = parseAspect(config.aspect)
  const allowUpscale = parseBooleanDirective('allowUpscale', config.allowUpscale) ?? false

  if (!width && !height && !aspect) return

  return function resizeTransform(state, image) {
    const fit = getFit(config, state)
    // calculate finalWidth & finalHeight
    const originalWidth = state.info.width
    const originalHeight = state.info.height
    const originalAspect = originalWidth / originalHeight

    let finalWidth = width
    let finalHeight = height
    let finalAspect: number | undefined = aspect

    if (aspect && !width && !height) {
      // only aspect was given, need to calculate which dimension to crop
      if (aspect > originalAspect) {
        finalHeight = originalWidth / aspect
        finalWidth = originalWidth
      } else {
        finalHeight = originalHeight
        finalWidth = originalHeight * aspect
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

      if (context.manualSearchParams.has('w') || context.manualSearchParams.has('h')) {
        context.logger.info(
          'allowUpscale not enabled. Image width, height and aspect ratio reverted to original values'
        )
      }
    }

    finalWidth = Math.round(finalWidth)
    finalHeight = Math.round(finalHeight)

    state.transforms.aspect = finalAspect
    state.transforms.allowUpscale = allowUpscale

    state.info.height = finalHeight
    state.info.width = finalWidth

    return image.resize({
      width: finalWidth || undefined,
      height: finalHeight || undefined,
      withoutEnlargement: !allowUpscale,
      fit,
      position: getPosition(config, state),
      kernel: getKernel(config, state),
      background: getBackground(config, state)
    })
  }
}
