[imagetools](../README.md) / [Modules](../modules.md) / [core/src](../modules/core_src.md) / Picture

# Interface: Picture

[core/src](../modules/core_src.md).Picture

The picture output format.

## Table of contents

### Properties

- [img](core_src.Picture.md#img)
- [sources](core_src.Picture.md#sources)
- [lqip](core_src.Picture.md#lqip)

## Properties

### img

• **img**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `h` | `number` |
| `src` | `string` |
| `w` | `number` |

#### Defined in

[packages/core/src/types.ts:98](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L98)

___

### sources

• **sources**: `Record`<`string`, `string`\>

Key is format. Value is srcset.

#### Defined in

[packages/core/src/types.ts:97](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L97)

### lqip

• `Optional` **lqip**: `string`

Low quality inplace image, base64 encoded, prepared for use with `src` attribute.

#### Defined in

[packages/core/src/types.ts:103](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L103)
