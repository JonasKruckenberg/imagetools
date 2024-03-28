[imagetools](../README.md) / [Modules](../modules.md) / vite/src/types

# Module: vite/src/types

## Table of contents

### Interfaces

- [VitePluginOptions](../interfaces/vite_src_types.VitePluginOptions.md)
- [CacheOptions](../interfaces/vite_src_types.CacheOptions.md)

### Type Aliases

- [DefaultDirectives](vite_src_types.md#defaultdirectives)
- [Exclude](vite_src_types.md#exclude)
- [ExtendOutputFormats](vite_src_types.md#extendoutputformats)
- [ExtendTransforms](vite_src_types.md#extendtransforms)
- [Include](vite_src_types.md#include)
- [ResolveConfigs](vite_src_types.md#resolveconfigs)

## Type Aliases

### DefaultDirectives

Ƭ **DefaultDirectives**: `URLSearchParams` \| (`url`: `URL`, `metadata`: () => `MaybePromise`<`Metadata`\>) => `MaybePromise`<`URLSearchParams`\>

#### Defined in

[packages/vite/src/types.ts:10](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L10)

___

### Exclude

Ƭ **Exclude**: (`string` \| `RegExp`)[] \| `string` \| `RegExp`

#### Defined in

[packages/vite/src/types.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L8)

___

### ExtendOutputFormats

Ƭ **ExtendOutputFormats**: (`builtins`: `Record`<`string`, [`OutputFormat`](vite_src.md#outputformat)\>) => `Record`<`string`, [`OutputFormat`](vite_src.md#outputformat)\>

#### Type declaration

▸ (`builtins`): `Record`<`string`, [`OutputFormat`](vite_src.md#outputformat)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | `Record`<`string`, [`OutputFormat`](vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, [`OutputFormat`](vite_src.md#outputformat)\>

#### Defined in

[packages/vite/src/types.ts:16](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L16)

___

### ExtendTransforms

Ƭ **ExtendTransforms**: (`builtins`: [`TransformFactory`](vite_src.md#transformfactory)[]) => [`TransformFactory`](vite_src.md#transformfactory)[]

#### Type declaration

▸ (`builtins`): [`TransformFactory`](vite_src.md#transformfactory)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | [`TransformFactory`](vite_src.md#transformfactory)[] |

##### Returns

[`TransformFactory`](vite_src.md#transformfactory)[]

#### Defined in

[packages/vite/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L14)

___

### Include

Ƭ **Include**: (`string` \| `RegExp`)[] \| `string` \| `RegExp`

#### Defined in

[packages/vite/src/types.ts:6](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L6)

___

### ResolveConfigs

Ƭ **ResolveConfigs**: typeof [`__type`](../interfaces/vite_src_types.VitePluginOptions.md#__type)

#### Defined in

[packages/vite/src/types.ts:18](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L18)
