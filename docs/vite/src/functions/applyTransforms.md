[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / applyTransforms

# Function: applyTransforms()

> **applyTransforms**(`transforms`, `image`, `removeMetadata?`): `Promise`\<[`ApplyTransformsResult`](../interfaces/ApplyTransformsResult.md)\>

Defined in: core/dist/lib/apply-transforms.d.ts:26

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

`boolean`

Whether to strip private metadata from the output.

## Returns

`Promise`\<[`ApplyTransformsResult`](../interfaces/ApplyTransformsResult.md)\>

The transformed image, threaded state, and source metadata.
