[imagetools](../README.md) / [Modules](../modules.md) / [vite/src/types](../modules/vite_src_types.md) / VitePluginOptions

# Interface: VitePluginOptions

[vite/src/types](../modules/vite_src_types.md).VitePluginOptions

## Table of contents

### Properties

- [defaultDirectives](vite_src_types.VitePluginOptions.md#defaultdirectives)
- [exclude](vite_src_types.VitePluginOptions.md#exclude)
- [extendOutputFormats](vite_src_types.VitePluginOptions.md#extendoutputformats)
- [extendTransforms](vite_src_types.VitePluginOptions.md#extendtransforms)
- [include](vite_src_types.VitePluginOptions.md#include)
- [removeMetadata](vite_src_types.VitePluginOptions.md#removemetadata)
- [resolveConfigs](vite_src_types.VitePluginOptions.md#resolveconfigs)
- [cache](vite_src_types.VitePluginOptions.md#cache)

## Properties

### defaultDirectives

• `Optional` **defaultDirectives**: [`DefaultDirectives`](../modules/vite_src_types.md#defaultdirectives)

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

[packages/vite/src/types.ts:59](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L59)

___

### exclude

• **exclude**: [`Exclude`](../modules/vite_src_types.md#exclude)

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

**`Default`**

```ts
'public/**/*'
```

#### Defined in

[packages/vite/src/types.ts:31](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L31)

___

### extendOutputFormats

• `Optional` **extendOutputFormats**: [`ExtendOutputFormats`](../modules/vite_src_types.md#extendoutputformats)

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

**`Default`**

```ts
[]
```

#### Defined in

[packages/vite/src/types.ts:73](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L73)

___

### extendTransforms

• `Optional` **extendTransforms**: [`ExtendTransforms`](../modules/vite_src_types.md#extendtransforms)

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

**`Default`**

```ts
[]
```

#### Defined in

[packages/vite/src/types.ts:66](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L66)

___

### include

• **include**: [`Include`](../modules/vite_src_types.md#include)

Which paths to include when processing images.

**`Default`**

```ts
'**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
```

#### Defined in

[packages/vite/src/types.ts:25](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L25)

___

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`Default`**

```ts
true
```

#### Defined in

[packages/vite/src/types.ts:85](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L85)

___

### resolveConfigs

• `Optional` **resolveConfigs**: (`entries`: [`string`, `string`[]][], `outputFormats`: `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\>) => `Record`<`string`, `string` \| `string`[]\>[]

#### Type declaration

▸ (`entries`, `outputFormats`): `Record`<`string`, `string` \| `string`[]\>[]

You can use this option to override the resolution of configs based on the url parameters

##### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`string`, `string`[]][] |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](../modules/vite_src.md#outputformat)\> |

##### Returns

`Record`<`string`, `string` \| `string`[]\>[]

**`Default`**

```ts
undefined
```

#### Defined in

[packages/vite/src/types.ts:79](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L79)

### cache

• **cache**: [`CacheOptions`](./vite_src_types.CacheOptions.md)

Options to enable caching of generated images.

**`Default`**

```ts
undefined
```

#### Defined in

[packages/vite/src/types.ts:97](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L97)
