[**imagetools**](../../../../README.md)

***

[imagetools](../../../../modules.md) / [vite/src/types](../README.md) / VitePluginOptions

# Interface: VitePluginOptions

Defined in: [packages/vite/src/types.ts:20](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L20)

## Properties

### cache?

> `optional` **cache**: [`CacheOptions`](CacheOptions.md)

Defined in: [packages/vite/src/types.ts:97](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L97)

Whether to cache transformed images and options for caching.

***

### defaultDirectives?

> `optional` **defaultDirectives**: [`DefaultDirectives`](../type-aliases/DefaultDirectives.md)

Defined in: [packages/vite/src/types.ts:59](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L59)

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives.
This can be used to define all sorts of shorthands or presets.

#### Example

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

***

### exclude

> **exclude**: [`Exclude`](../type-aliases/Exclude.md)

Defined in: [packages/vite/src/types.ts:31](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L31)

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

#### Default

```ts
'public/**/*'
```

***

### extendOutputFormats?

> `optional` **extendOutputFormats**: [`ExtendOutputFormats`](../type-aliases/ExtendOutputFormats.md)

Defined in: [packages/vite/src/types.ts:73](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L73)

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

#### Default

```ts
[]
```

***

### extendTransforms?

> `optional` **extendTransforms**: [`ExtendTransforms`](../type-aliases/ExtendTransforms.md)

Defined in: [packages/vite/src/types.ts:66](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L66)

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

#### Default

```ts
[]
```

***

### include

> **include**: [`Include`](../type-aliases/Include.md)

Defined in: [packages/vite/src/types.ts:25](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L25)

Which paths to include when processing images.

#### Default

```ts
'**/*.{heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
```

***

### namedExports?

> `optional` **namedExports**: `boolean`

Defined in: [packages/vite/src/types.ts:92](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L92)

Whether to generate named exports.
Takes precedence over Vite's `json.namedExports`

#### Default

```ts
undefined
```

***

### removeMetadata

> **removeMetadata**: `boolean`

Defined in: [packages/vite/src/types.ts:85](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L85)

Whether to remove potentially private metadata from the image, such as exif tags etc.

#### Default

```ts
true
```

***

### resolveConfigs()?

> `optional` **resolveConfigs**: (`entries`, `outputFormats`) => `Record`\<`string`, `string` \| `string`[]\>[]

Defined in: [packages/vite/src/types.ts:79](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/vite/src/types.ts#L79)

You can use this option to override the resolution of configs based on the url parameters

This function builds up all possible combinations the given entries can be combined
and returns it as an array of objects that can be given to a the transforms.

#### Parameters

##### entries

\[`string`, `string`[]\][]

The url parameter entries

##### outputFormats

`Record`\<`string`, [`OutputFormat`](../../type-aliases/OutputFormat.md)\>

#### Returns

`Record`\<`string`, `string` \| `string`[]\>[]

An array of directive options

#### Default

```ts
undefined
```
