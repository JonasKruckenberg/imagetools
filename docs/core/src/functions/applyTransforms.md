[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / applyTransforms

# Function: applyTransforms()

> **applyTransforms**(`transforms`, `image`, `removeMetadata?`): `Promise`\<[`ApplyTransformsResult`](../interfaces/ApplyTransformsResult.md)\>

Defined in: [core/src/lib/apply-transforms.ts:28](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/apply-transforms.ts#L28)

Runs the pipeline over an image, threading a mutable `ImageMetadata` through
each transform. The state is initialized from the source file, so transforms
see the source dimensions and format before they run.

When `removeMetadata` is `true` (the default), private metadata (`exif`,
`iptc`, `xmp`, `tifftagPhotoshop`, `icc`) is stripped from the returned
`raw`; otherwise `withMetadata` is kept on the output image.

## Parameters

### transforms

[`ImageTransformation`](../type-aliases/ImageTransformation.md)[]

The pipeline steps to apply, in order.

### image

`Sharp`

The image to process.

### removeMetadata?

`boolean` = `true`

Whether to strip private metadata from the output.

## Returns

`Promise`\<[`ApplyTransformsResult`](../interfaces/ApplyTransformsResult.md)\>

The transformed image, threaded state, and source metadata.
