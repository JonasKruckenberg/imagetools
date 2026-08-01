[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / ApplyTransformsResult

# Interface: ApplyTransformsResult

Defined in: [core/src/lib/apply-transforms.ts:9](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/apply-transforms.ts#L9)

The result of applying a set of transforms to an image: the transformed image,
the state threaded through the pipeline, and the raw metadata of the source
image as read before any transformation.

## Properties

### image

> **image**: `Sharp`

Defined in: [core/src/lib/apply-transforms.ts:10](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/apply-transforms.ts#L10)

***

### metadata

> **metadata**: [`ImageMetadata`](ImageMetadata.md)

Defined in: [core/src/lib/apply-transforms.ts:11](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/apply-transforms.ts#L11)

***

### raw

> **raw**: `Metadata`

Defined in: [core/src/lib/apply-transforms.ts:12](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/apply-transforms.ts#L12)
