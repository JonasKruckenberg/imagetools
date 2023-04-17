[imagetools](../README.md) / [Modules](../modules.md) / [rollup/src/types](../modules/rollup_src_types.md) / RollupPluginOptions

# Interface: RollupPluginOptions

[rollup/src/types](../modules/rollup_src_types.md).RollupPluginOptions

## Table of contents

### Properties

- [defaultDirectives](rollup_src_types.RollupPluginOptions.md#defaultdirectives)
- [exclude](rollup_src_types.RollupPluginOptions.md#exclude)
- [extendOutputFormats](rollup_src_types.RollupPluginOptions.md#extendoutputformats)
- [extendTransforms](rollup_src_types.RollupPluginOptions.md#extendtransforms)
- [include](rollup_src_types.RollupPluginOptions.md#include)
- [removeMetadata](rollup_src_types.RollupPluginOptions.md#removemetadata)
- [resolveConfigs](rollup_src_types.RollupPluginOptions.md#resolveconfigs)
- [silent](rollup_src_types.RollupPluginOptions.md#silent)

## Properties

### defaultDirectives

• `Optional` **defaultDirectives**: `URLSearchParams` \| (`url`: `URL`) => `URLSearchParams`

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives.
This can be used to define all sorts of shorthands or presets.

**`Example`**

```js
import { imagetools } from 'vite-imagetools'

export default {
 plugins: [
   imagetools({
      defaultDirectives: (url) => {
       if (url.searchParams.has('spotify')) {
          return new URLSearchParams({
            tint: 'ffaa22'
          })
        }
        return new URLSearchParams()
      }
    })
   ]
}
```

#### Defined in

[rollup/src/types.ts:40](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L40)

___

### exclude

• **exclude**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

What paths to exclude when processing images.

**`Default`**

''

#### Defined in

[rollup/src/types.ts:13](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L13)

___

### extendOutputFormats

• `Optional` **extendOutputFormats**: (`builtins`: `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>) => `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

#### Type declaration

▸ (`builtins`): `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

**`Default`**

[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

#### Defined in

[rollup/src/types.ts:54](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L54)

___

### extendTransforms

• `Optional` **extendTransforms**: (`builtins`: [`TransformFactory`](../modules/vite_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]) => [`TransformFactory`](../modules/vite_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

#### Type declaration

▸ (`builtins`): [`TransformFactory`](../modules/vite_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

**`Default`**

[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | [`TransformFactory`](../modules/vite_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[] |

##### Returns

[`TransformFactory`](../modules/vite_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

#### Defined in

[rollup/src/types.ts:47](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L47)

___

### include

• **include**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

Which paths to include when processing images.

**`Default`**

'**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'

#### Defined in

[rollup/src/types.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L8)

___

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`Default`**

true

#### Defined in

[rollup/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L71)

___

### resolveConfigs

• `Optional` **resolveConfigs**: (`entries`: [`string`, `string`[]][], `outputFormats`: `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>) => `Record`<`string`, `string` \| `string`[]\>[]

#### Type declaration

▸ (`entries`, `outputFormats`): `Record`<`string`, `string` \| `string`[]\>[]

You can use this option to override the resolution of configs based on the url parameters

**`Default`**

undefined

##### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`string`, `string`[]][] |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, `string` \| `string`[]\>[]

#### Defined in

[rollup/src/types.ts:60](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L60)

___

### silent

• `Optional` **silent**: `boolean`

**`Deprecated`**

This option has no effect. Logging is done through Rollup's warning facilities.

#### Defined in

[rollup/src/types.ts:65](https://github.com/JonasKruckenberg/imagetools/blob/6842c73/packages/rollup/src/types.ts#L65)
