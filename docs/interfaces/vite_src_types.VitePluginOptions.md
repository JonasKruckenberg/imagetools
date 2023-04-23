[imagetools](../README.md) / [Modules](../modules.md) / [vite/src/types](../modules/vite_src_types.md) / VitePluginOptions

# Interface: VitePluginOptions

[vite/src/types](../modules/vite_src_types.md).VitePluginOptions

## Table of contents

### Properties

- [defaultDirectives](vite_src_types.VitePluginOptions.md#defaultdirectives)
- [exclude](vite_src_types.VitePluginOptions.md#exclude)
- [extendOutputFormats](vite_src_types.VitePluginOptions.md#extendoutputformats)
- [extendTransforms](vite_src_types.VitePluginOptions.md#extendtransforms)
- [force](vite_src_types.VitePluginOptions.md#force)
- [include](vite_src_types.VitePluginOptions.md#include)
- [removeMetadata](vite_src_types.VitePluginOptions.md#removemetadata)
- [resolveConfigs](vite_src_types.VitePluginOptions.md#resolveconfigs)
- [silent](vite_src_types.VitePluginOptions.md#silent)

## Properties

### defaultDirectives

• `Optional` **defaultDirectives**: `URLSearchParams` \| (`url`: `URL`) => `URLSearchParams`

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives.
This can be used to define all sorts of shorthands or presets.

**`Example`**

```js
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
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
})
```

#### Defined in

[vite/src/types.ts:42](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L42)

___

### exclude

• **exclude**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

**`Default`**

```ts
'public/**/*'
```

#### Defined in

[vite/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L14)

___

### extendOutputFormats

• `Optional` **extendOutputFormats**: (`builtins`: `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>) => `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

#### Type declaration

▸ (`builtins`): `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

**`Default`**

```ts
[]
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>

#### Defined in

[vite/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L56)

___

### extendTransforms

• `Optional` **extendTransforms**: (`builtins`: [`TransformFactory`](../modules/vite_src.md#transformfactory)[]) => [`TransformFactory`](../modules/vite_src.md#transformfactory)[]

#### Type declaration

▸ (`builtins`): [`TransformFactory`](../modules/vite_src.md#transformfactory)[]

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

**`Default`**

```ts
[]
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | [`TransformFactory`](../modules/vite_src.md#transformfactory)[] |

##### Returns

[`TransformFactory`](../modules/vite_src.md#transformfactory)[]

#### Defined in

[vite/src/types.ts:49](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L49)

___

### force

• `Optional` **force**: `boolean`

This option used to enable the plugin during development mode. This option is no longer required!

**`Deprecated`**

#### Defined in

[vite/src/types.ts:79](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L79)

___

### include

• **include**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

Which paths to include when processing images.

**`Default`**

```ts
'**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
```

#### Defined in

[vite/src/types.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L8)

___

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`Default`**

```ts
true
```

#### Defined in

[vite/src/types.ts:73](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L73)

___

### resolveConfigs

• `Optional` **resolveConfigs**: (`entries`: [`string`, `string`[]][], `outputFormats`: `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>) => `Record`<`string`, `string` \| `string`[]\>[]

#### Type declaration

▸ (`entries`, `outputFormats`): `Record`<`string`, `string` \| `string`[]\>[]

You can use this option to override the resolution of configs based on the url parameters

**`Default`**

```ts
undefined
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`string`, `string`[]][] |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, `string` \| `string`[]\>[]

#### Defined in

[vite/src/types.ts:62](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L62)

___

### silent

• `Optional` **silent**: `boolean`

**`Deprecated`**

This option has no effect. Logging is done through Vite's logger.

#### Defined in

[vite/src/types.ts:67](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/types.ts#L67)
