[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / ResizeOptions

# Interface: ResizeOptions

Defined in: [core/src/transforms/resize.ts:8](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L8)

## Properties

### allowUpscale

> **allowUpscale**: `""` \| `"true"`

Defined in: [core/src/transforms/resize.ts:16](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L16)

Whether to allow making images larger. This is generally a waste, so is disabled by default.

***

### aspect

> **aspect**: `string`

Defined in: [core/src/transforms/resize.ts:14](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L14)

aspect ratio

***

### basePixels

> **basePixels**: `string`

Defined in: [core/src/transforms/resize.ts:22](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L22)

The width in pixels for the 1x pixel density descriptor.
If supplied, the srcset, img and picture output formats use pixel density descriptors rather than width descriptors.
This is consumed when generating the output, so it can be used with or without a `w`/`h`/`aspect` directive.

***

### h

> **h**: `string`

Defined in: [core/src/transforms/resize.ts:12](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L12)

height in pixels

***

### w

> **w**: `string`

Defined in: [core/src/transforms/resize.ts:10](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/transforms/resize.ts#L10)

width in pixels
