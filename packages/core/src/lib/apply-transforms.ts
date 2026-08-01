import type { Metadata, Sharp } from 'sharp'
import type { ImageMetadata, ImageTransformation } from '../types.js'

/**
 * The result of applying a set of transforms to an image: the transformed image,
 * the state threaded through the pipeline, and the raw metadata of the source
 * image as read before any transformation.
 */
export interface ApplyTransformsResult {
  image: Sharp
  metadata: ImageMetadata
  raw: Metadata
}

/**
 * Runs the pipeline over an image, threading a mutable `ImageMetadata` through
 * each transform. The state is initialized from the source file, so transforms
 * see the source dimensions and format before they run.
 *
 * When `removeMetadata` is `true` (the default), private metadata (`exif`,
 * `iptc`, `xmp`, `tifftagPhotoshop`, `icc`) is stripped from the returned
 * `raw`; otherwise `withMetadata` is kept on the output image.
 * @param transforms The pipeline steps to apply, in order.
 * @param image The image to process.
 * @param removeMetadata Whether to strip private metadata from the output.
 * @returns The transformed image, threaded state, and source metadata.
 */
export async function applyTransforms(
  transforms: ImageTransformation[],
  image: Sharp,
  removeMetadata = true
): Promise<ApplyTransformsResult> {
  const raw = await image.metadata()

  if (removeMetadata) {
    delete raw.exif
    delete raw.iptc
    delete raw.xmp
    delete raw.tifftagPhotoshop
    delete raw.icc
  } else {
    image.withMetadata()
  }

  const metadata: ImageMetadata = {
    info: {
      width: raw.width,
      height: raw.height,
      autoOrient: raw.autoOrient
    },
    transforms: {
      format: raw.format
    }
  }

  for (const transform of transforms) {
    image = await transform(metadata, image)
  }

  return {
    image,
    metadata,
    raw
  }
}
