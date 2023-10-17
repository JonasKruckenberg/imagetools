[imagetools](../README.md) / [Modules](../modules.md) / [vite/src](../modules/vite_src.md) / ResizeOptions

# Interface: ResizeOptions

[vite/src](../modules/vite_src.md).ResizeOptions

## Table of contents

### Properties

- [allowUpscale](vite_src.ResizeOptions.md#allowupscale)
- [aspect](vite_src.ResizeOptions.md#aspect)
- [basePixels](vite_src.ResizeOptions.md#basepixels)
- [h](vite_src.ResizeOptions.md#h)
- [w](vite_src.ResizeOptions.md#w)

## Properties

### allowUpscale

• **allowUpscale**: ``""`` \| ``"true"``

Whether to allow making images larger. This is generally a waste, so is disabled by default.

#### Defined in

packages/core/dist/transforms/resize.d.ts:10

___

### aspect

• **aspect**: `string`

aspect ratio

#### Defined in

packages/core/dist/transforms/resize.d.ts:8

___

### basePixels

• **basePixels**: `string`

The width in pixels for the 1x pixel density descriptor.
If supplied, output will use pixel density descriptors rather than width descriptors.

#### Defined in

packages/core/dist/transforms/resize.d.ts:15

___

### h

• **h**: `string`

height in pixels

#### Defined in

packages/core/dist/transforms/resize.d.ts:6

___

### w

• **w**: `string`

width in pixels

#### Defined in

packages/core/dist/transforms/resize.d.ts:4
