[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / ImageTransformation

# Type Alias: ImageTransformation()

> **ImageTransformation** = (`state`, `image`) => `Sharp` \| `Promise`\<`Sharp`\>

Defined in: [core/src/types.ts:113](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L113)

A single step of the pipeline: reads from and writes to the threaded
`ImageMetadata`, and returns the image to continue processing.

## Parameters

### state

[`ImageMetadata`](../interfaces/ImageMetadata.md)

### image

`Sharp`

## Returns

`Sharp` \| `Promise`\<`Sharp`\>
