import type { Sharp } from 'sharp'
import type { ApplyTransformsOptions, ImageTransformation, TransformResult } from '../types.js'
import { METADATA } from './metadata.js'

const defaultOptions: ApplyTransformsOptions = {
  removeMetadata: true
}

export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  options?: ApplyTransformsOptions
): Promise<TransformResult>
export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  removeMetadata?: boolean
): Promise<TransformResult>
export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  optionsOrRemoveMetadata?: ApplyTransformsOptions | boolean
): Promise<TransformResult> {
  const opts = {
    ...defaultOptions,
    ...(typeof optionsOrRemoveMetadata === 'boolean'
      ? { removeMetadata: optionsOrRemoveMetadata }
      : optionsOrRemoveMetadata)
  }

  image[METADATA] = { ...(await image.metadata()) }

  if (opts.removeMetadata) {
    // delete the private metadata
    delete image[METADATA].exif
    delete image[METADATA].iptc
    delete image[METADATA].xmp
    delete image[METADATA].tifftagPhotoshop
    delete image[METADATA].icc
  } else {
    image.withMetadata()
  }

  for (const transform of transforms) {
    image = await transform(image)
  }

  return {
    image,
    metadata: image[METADATA]
  }
}
