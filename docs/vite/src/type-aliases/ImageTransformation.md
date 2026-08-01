[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ImageTransformation

# Type Alias: ImageTransformation()

> **ImageTransformation** = (`state`, `image`) => `Sharp` \| `Promise`\<`Sharp`\>

Defined in: core/dist/types.d.ts:100

A single step of the pipeline: reads from and writes to the threaded
`ImageMetadata`, and returns the image to continue processing.

## Parameters

### state

[`ImageMetadata`](../interfaces/ImageMetadata.md)

### image

`Sharp`

## Returns

`Sharp` \| `Promise`\<`Sharp`\>
