import type { Sharp } from 'sharp'
import type { ApplyTransformsOptions, ImageTransformation, TransformResult } from '../types.js'
import { METADATA } from './metadata.js'
import sharp from 'sharp'

const defaultOptions: ApplyTransformsOptions = {
  removeMetadata: true
}

async function applyPreTransformOrientation(
  transforms: ImageTransformation[],
  image: Sharp,
  opts: ApplyTransformsOptions
) {
  if (!opts.experimental?.preserveInitialOrientation) return image

  const initialOrientation = image[METADATA].orientation
  if (!initialOrientation || initialOrientation === 1) return image

  let tempImage = image.clone()
  tempImage[METADATA] = { ...image[METADATA] }

  for (const transform of transforms) {
    tempImage = await transform(tempImage)
  }

  const willFlip = !!tempImage[METADATA].flip
  const willFlop = !!tempImage[METADATA].flop
  const willRotate = !!tempImage[METADATA].rotate

  image.rotate() // no args -> do the exif orientation

  if (willFlip || willFlop || willRotate) {
    image = sharp(await image.toBuffer())
    image[METADATA] = { ...image[METADATA] }
  }

  return image
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

  image = await applyPreTransformOrientation(transforms, image, opts)

  for (const transform of transforms) {
    image = await transform(image)
  }

  return {
    image,
    metadata: image[METADATA]
  }
}
