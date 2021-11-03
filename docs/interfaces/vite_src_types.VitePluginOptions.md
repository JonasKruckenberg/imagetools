[imagetools](../README.md) / [Modules](../modules.md) / [vite/src/types](../modules/vite_src_types.md) / VitePluginOptions

# Interface: VitePluginOptions

[vite/src/types](../modules/vite_src_types.md).VitePluginOptions

## Table of contents

### Properties

- [defaultDirectives](vite_src_types.VitePluginOptions.md#defaultdirectives)
- [exclude](vite_src_types.VitePluginOptions.md#exclude)
- [force](vite_src_types.VitePluginOptions.md#force)
- [include](vite_src_types.VitePluginOptions.md#include)
- [removeMetadata](vite_src_types.VitePluginOptions.md#removemetadata)
- [silent](vite_src_types.VitePluginOptions.md#silent)

### Methods

- [extendOutputFormats](vite_src_types.VitePluginOptions.md#extendoutputformats)
- [extendTransforms](vite_src_types.VitePluginOptions.md#extendtransforms)

## Properties

### defaultDirectives

• `Optional` **defaultDirectives**: `Record`<`string`, `string`\> \| (`id`: `string`) => `Record`<`string`, `string`\>

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives

#### Defined in

[vite/src/types.ts:20](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L20)

___

### exclude

• **exclude**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

**`default`** 'public\/**\/*'

#### Defined in

[vite/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L14)

___

### force

• `Optional` **force**: `boolean`

This option used to enable the plugin during development mode. This option is no longer required!

**`deprecated`**

#### Defined in

[vite/src/types.ts:52](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L52)

___

### include

• **include**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

Which paths to include when processing images.

**`default`** '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'

#### Defined in

[vite/src/types.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L8)

___

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`default`** true

#### Defined in

[vite/src/types.ts:46](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L46)

___

### silent

• **silent**: `boolean`

Settings this option to true disables all warnings produced by this plugin

**`default`** false

#### Defined in

[vite/src/types.ts:40](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L40)

## Methods

### extendOutputFormats

▸ `Optional` **extendOutputFormats**(`builtins`): `Record`<`string`, [`OutputFormat`](../modules/core_src.md#outputformat)\>

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

**`default`** []

#### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | `Record`<`string`, [`OutputFormat`](../modules/core_src.md#outputformat)\> |

#### Returns

`Record`<`string`, [`OutputFormat`](../modules/core_src.md#outputformat)\>

#### Defined in

[vite/src/types.ts:34](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L34)

___

### extendTransforms

▸ `Optional` **extendTransforms**(`builtins`): [`TransformFactory`](../modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

**`default`** []

#### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | [`TransformFactory`](../modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[] |

#### Returns

[`TransformFactory`](../modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

#### Defined in

[vite/src/types.ts:27](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L27)
