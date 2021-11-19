import { Sharp } from 'sharp'
import { ImageTransformation, TransformResult } from '../types'
import { METADATA } from './metadata'

export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  removeMetadata = true
): Promise<TransformResult> {
  image[METADATA] = await image.metadata()

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
