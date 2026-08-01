[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ResizeOptions

# Interface: ResizeOptions

Defined in: core/dist/transforms/resize.d.ts:2

## Properties

### allowUpscale

> **allowUpscale**: `""` \| `"true"`

Defined in: core/dist/transforms/resize.d.ts:10

Whether to allow making images larger. This is generally a waste, so is disabled by default.

***

### aspect

> **aspect**: `string`

Defined in: core/dist/transforms/resize.d.ts:8

aspect ratio

***

### basePixels

> **basePixels**: `string`

Defined in: core/dist/transforms/resize.d.ts:16

The width in pixels for the 1x pixel density descriptor.
If supplied, the srcset, img and picture output formats use pixel density descriptors rather than width descriptors.
This is consumed when generating the output, so it can be used with or without a `w`/`h`/`aspect` directive.

***

### h

> **h**: `string`

Defined in: core/dist/transforms/resize.d.ts:6

height in pixels

***

### w

> **w**: `string`

Defined in: core/dist/transforms/resize.d.ts:4

width in pixels
