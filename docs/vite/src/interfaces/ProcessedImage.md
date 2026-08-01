[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ProcessedImage

# Interface: ProcessedImage

Defined in: core/dist/types.d.ts:61

A processed image, ready to be consumed by an output format: the pipeline
`ImageMetadata`, the source `raw` metadata, the URL, config and sharp instance
that produced it.

## Extends

- [`ImageMetadata`](ImageMetadata.md)

## Properties

### config

> **config**: [`ImageConfig`](../type-aliases/ImageConfig.md)

Defined in: core/dist/types.d.ts:67

The config used to generate this image.

***

### image

> **image**: `Sharp`

Defined in: core/dist/types.d.ts:65

The sharp instance of the processed image.

***

### info

> **info**: [`ImageInfo`](ImageInfo.md)

Defined in: core/dist/types.d.ts:53

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`info`](ImageMetadata.md#info)

***

### raw

> **raw**: `Metadata`

Defined in: core/dist/types.d.ts:73

The sharp metadata of the image. On a cache miss this is read from the source
before any transformations; when restored from a cache it is read from the
processed output instead.

***

### src

> **src**: `string`

Defined in: core/dist/types.d.ts:63

The URL of the image.

***

### transforms

> **transforms**: [`AppliedTransforms`](AppliedTransforms.md)

Defined in: core/dist/types.d.ts:54

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`transforms`](ImageMetadata.md#transforms)
