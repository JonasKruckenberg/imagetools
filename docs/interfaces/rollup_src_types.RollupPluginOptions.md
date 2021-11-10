[imagetools](../README.md) / [Modules](../modules.md) / [rollup/src/types](../modules/rollup_src_types.md) / RollupPluginOptions

# Interface: RollupPluginOptions

[rollup/src/types](../modules/rollup_src_types.md).RollupPluginOptions

## Table of contents

### Properties

- [defaultDirectives](rollup_src_types.RollupPluginOptions.md#defaultdirectives)
- [exclude](rollup_src_types.RollupPluginOptions.md#exclude)
- [include](rollup_src_types.RollupPluginOptions.md#include)
- [removeMetadata](rollup_src_types.RollupPluginOptions.md#removemetadata)
- [resolveConfigs](rollup_src_types.RollupPluginOptions.md#resolveconfigs)
- [silent](rollup_src_types.RollupPluginOptions.md#silent)

### Methods

- [extendOutputFormats](rollup_src_types.RollupPluginOptions.md#extendoutputformats)
- [extendTransforms](rollup_src_types.RollupPluginOptions.md#extendtransforms)

## Properties

### defaultDirectives

• `Optional` **defaultDirectives**: `URLSearchParams` \| (`url`: `URL`) => `URLSearchParams`

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives

#### Defined in

[rollup/src/types.ts:19](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L19)

___

### exclude

• **exclude**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

What paths to exclude when processing images.

**`default`** ''

#### Defined in

[rollup/src/types.ts:13](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L13)

___

### include

• **include**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

Which paths to include when processing images.

**`default`** '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'

#### Defined in

[rollup/src/types.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L8)

___

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`default`** true

#### Defined in

[rollup/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L51)

___

### resolveConfigs

• `Optional` **resolveConfigs**: (`entries`: [`string`, `string`[]][], `outputFormats`: `Record`<`string`, [`OutputFormat`](../modules/core_src.md#outputformat)\>) => `Record`<`string`, `string` \| `string`[]\>[]

#### Type declaration

▸ (`entries`, `outputFormats`): `Record`<`string`, `string` \| `string`[]\>[]

This function builds up all possible combinations the given entries can be combined
an returns it as an array of objects that can be given to a the transforms.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entries` | [`string`, `string`[]][] | The url parameter entries |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](../modules/core_src.md#outputformat)\> | - |

##### Returns

`Record`<`string`, `string` \| `string`[]\>[]

An array of directive options

#### Defined in

[rollup/src/types.ts:39](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L39)

___

### silent

• **silent**: `boolean`

Settings this option to true disables all warnings produced by this plugin

**`default`** false

#### Defined in

[rollup/src/types.ts:45](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L45)

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

[rollup/src/types.ts:33](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L33)

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

[rollup/src/types.ts:26](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/rollup/src/types.ts#L26)
