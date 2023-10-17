[imagetools](../README.md) / [Modules](../modules.md) / [core/src](../modules/core_src.md) / ResizeOptions

# Interface: ResizeOptions

[core/src](../modules/core_src.md).ResizeOptions

## Table of contents

### Properties

- [allowUpscale](core_src.ResizeOptions.md#allowupscale)
- [aspect](core_src.ResizeOptions.md#aspect)
- [basePixels](core_src.ResizeOptions.md#basepixels)
- [h](core_src.ResizeOptions.md#h)
- [w](core_src.ResizeOptions.md#w)

## Properties

### allowUpscale

• **allowUpscale**: ``""`` \| ``"true"``

Whether to allow making images larger. This is generally a waste, so is disabled by default.

#### Defined in

[packages/core/src/transforms/resize.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/resize.ts#L17)

___

### aspect

• **aspect**: `string`

aspect ratio

#### Defined in

[packages/core/src/transforms/resize.ts:15](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/resize.ts#L15)

___

### basePixels

• **basePixels**: `string`

The width in pixels for the 1x pixel density descriptor.
If supplied, output will use pixel density descriptors rather than width descriptors.

#### Defined in

[packages/core/src/transforms/resize.ts:22](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/resize.ts#L22)

___

### h

• **h**: `string`

height in pixels

#### Defined in

[packages/core/src/transforms/resize.ts:13](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/resize.ts#L13)

___

### w

• **w**: `string`

width in pixels

#### Defined in

[packages/core/src/transforms/resize.ts:11](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/resize.ts#L11)
