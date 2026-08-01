[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / ProcessedImage

# Interface: ProcessedImage

Defined in: [core/src/types.ts:62](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L62)

A processed image, ready to be consumed by an output format: the pipeline
`ImageMetadata`, the source `raw` metadata, the URL, config and sharp instance
that produced it.

## Extends

- [`ImageMetadata`](ImageMetadata.md)

## Properties

### config

> **config**: [`ImageConfig`](../type-aliases/ImageConfig.md)

Defined in: [core/src/types.ts:68](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L68)

The config used to generate this image.

***

### image

> **image**: `Sharp`

Defined in: [core/src/types.ts:66](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L66)

The sharp instance of the processed image.

***

### info

> **info**: [`ImageInfo`](ImageInfo.md)

Defined in: [core/src/types.ts:53](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L53)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`info`](ImageMetadata.md#info)

***

### raw

> **raw**: `Metadata`

Defined in: [core/src/types.ts:74](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L74)

The sharp metadata of the image. On a cache miss this is read from the source
before any transformations; when restored from a cache it is read from the
processed output instead.

***

### src

> **src**: `string`

Defined in: [core/src/types.ts:64](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L64)

The URL of the image.

***

### transforms

> **transforms**: [`AppliedTransforms`](AppliedTransforms.md)

Defined in: [core/src/types.ts:54](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L54)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`transforms`](ImageMetadata.md#transforms)
