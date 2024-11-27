# vite-imagetools

<!-- badges -->

![npm (latest)](https://img.shields.io/npm/v/vite-imagetools)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![codecov](https://codecov.io/gh/JonasKruckenberg/imagetools/branch/graph/badge.svg?token=bJrFBmuczA&flag=vite-imagetools)](https://codecov.io/gh/JonasKruckenberg/imagetools/)

A toolbox of import [directives](../../docs/directives.md) for [Vite](https://github.com/vitejs/vite) that can transform
your image at compile-time. All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

## Features

- **🚀 Output modern formats**
- **🖼 Resize Images**
- **🔗 Easy Srcset generation**
- **⚡️ Fast in development mode**
- **🔒 Remove Image Metadata**
- **🧩 Extensible**

> [Read the docs to learn more!](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/README.md)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm install --save-dev vite-imagetools
```

## Usage

```ts
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [imagetools()]
})
```

```js
import Image from 'example.jpg?w=400&h=300&format=webp'
```

You can also import a directory of images using
[Vite's `import.meta.glob` with its `query` option](https://vitejs.dev/guide/features.html#custom-queries).

## Options

### defaultDirectives

• `Optional` **defaultDirectives**: `URLSearchParams | (url: URL) => URLSearchParams`

This option allows you to specify [directives](../../docs/directives.md) that should be applied _by default_ to every
image. You can also provide a function, in which case the function gets passed the asset ID and should return an object
of [directives](../../docs/directives.md). This can be used to define all sorts of shorthands or presets.

**`example`**

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

---

### exclude

• **exclude**: `string | RegExp | (string | RegExp)[]`

What paths to exclude when processing images. This defaults to the public dir to mirror Vite's behavior.

**`default`** `'public\/**\/*'`

---

### include

• **include**: `string | RegExp | (string | RegExp)[]`

Which paths to include when processing images.

**`default`** `/^[^?]+\.(heif|avif|jpeg|jpg|png|tiff|webp|gif)(\?.*)?$/`

---

### removeMetadata

• **removeMetadata**: `boolean`

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`default`** true

---

### extendOutputFormats

▸ `Optional` **extendOutputFormats**(`builtins`): `Record`<`string`,
[`OutputFormat`](../../docs/core/src/type-aliases/OutputFormat.md)\>

You can use this option to extend the builtin list of output formats. This list will be merged with the builtin output
formats before determining the format to use.

**`default`** []

#### Parameters

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `builtins` | `Record`<`string`, [`OutputFormat`](../../docs/core/src/type-aliases/OutputFormat.md)\> |

#### Returns

`Record`<`string`, [`OutputFormat`](../../docs/core/src/type-aliases/OutputFormat.md)\>

---

### extendTransforms

▸ `Optional` **extendTransforms**(`builtins`):
[`TransformFactory`](../../docs/core/src/type-aliases/TransformFactory.md)<`Record`<`string`, `unknown`\>\>[]

You can use this option to extend the builtin list of import transforms. This list will be merged with the builtin
transforms before applying them to the input image.

**`default`** []

#### Parameters

| Name       | Type                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| `builtins` | [`TransformFactory`](../../docs/core/src/type-aliases/TransformFactory.md)<`Record`<`string`, `unknown`\>\>[] |

#### Returns

[`TransformFactory`](../../docs/core/src/type-aliases/TransformFactory.md)<`Record`<`string`, `unknown`\>\>[]

---

### resolveConfigs

• `Optional` **resolveConfigs**: (`entries`: `[string, string[]][]`, `outputFormats`: `Record`<`string`,
[`OutputFormat`](../core/src/README.md#outputformat)\>) => `Record<string, string | string[]>[]`

#### Type declaration

▸ (`entries`, `outputFormats`): `Record<string, string | string[]>[]`

This function builds up all possible combinations the given entries can be combined an returns it as an array of objects
that can be given to a the transforms.

##### Parameters

| Name            | Type                                                                      | Description               |
| :-------------- | :------------------------------------------------------------------------ | :------------------------ |
| `entries`       | `[string, string[]][]`                                                    | The url parameter entries |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](../core/src/README.md#outputformat)\> | -                         |

##### Returns

`Record<string, string | string[]>[]`

An array of directive options

## Contributing

Feel free to dive in! [Open an issue](https://github.com/JonasKruckenberg/imagetools/issues/new) or submit PRs! All
information to get you started hacking on imagetools is in [CONTRIBUTING.md](../../CONTRIBUTING.md)!

## License

[MIT © Jonas Kruckenberg.](./LICENSE)
