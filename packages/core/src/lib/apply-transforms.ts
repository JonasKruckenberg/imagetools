import type { Sharp } from 'sharp'
import type { ImageTransformation, TransformResult } from '../types.js'
import { METADATA } from './metadata.js'

export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  removeMetadata = true
): Promise<TransformResult> {
  image[METADATA] = { ...(await image.metadata()) }

  if (removeMetadata) {
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
