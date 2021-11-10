# vite-imagetools

<!-- badges -->

![npm (latest)](https://img.shields.io/npm/v/vite-imagetools)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![codecov](https://codecov.io/gh/JonasKruckenberg/imagetools/branch/graph/badge.svg?token=bJrFBmuczA&flag=vite-imagetools)](https://codecov.io/gh/JonasKruckenberg/imagetools/)

A toolbox of import directives for [vitejs](https://github.com/vitejs/vite) that can transform your image at
compile-time. All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

## Features

- **🚀 Output modern formats**
- **🖼 Resize Images**
- **🔗 Easy Srcset generation**
- **⚡️ Fast in development mode**
- **🔒 Remove Image Metadata**
- **🧩 Extensible**

> [Read the docs to learn more!](../../docs/README.md)

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

```
yarn add -D vite-imagetools
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
import Image from 'example.jpg?w=400&h=300&webp'
```

## Options

### defaultDirectives

• `Optional` **defaultDirectives**: `URLSearchParams` \| (`url`: `URL`) => `URLSearchParams`

This option allows you to specify directives that should be applied _by default_ to every image.
You can also provide a function, in which case the function gets passed the asset ID and should return an object of directives

#### Defined in

[vite/src/types.ts:20](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/vite/src/types.ts#L20)

___

### exclude

• **exclude**: `string` \| `RegExp` \| (`string` \| `RegExp`)[]

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

**`default`** 'public\/**\/*'

#### Defined in

[vite/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L14)

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

### extendOutputFormats

▸ `Optional` **extendOutputFormats**(`builtins`): `Record`<`string`, [`OutputFormat`](../../docs/modules/core_src.md#outputformat)\>

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.

**`default`** []

#### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | `Record`<`string`, [`OutputFormat`](../../docs/modules/core_src.md#outputformat)\> |

#### Returns

`Record`<`string`, [`OutputFormat`](../../docs/modules/core_src.md#outputformat)\>

#### Defined in

[vite/src/types.ts:34](https://github.com/JonasKruckenberg/imagetools/blob/4253c96/packages/vite/src/types.ts#L34)

___

### extendTransforms

▸ `Optional` **extendTransforms**(`builtins`): [`TransformFactory`](../../docs/modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

You can use this option to extend the builtin list of import transforms.
This list will be merged with the builtin transforms before applying them to the input image.

**`default`** []

#### Parameters

| Name | Type |
| :------ | :------ |
| `builtins` | [`TransformFactory`](../../docs/modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[] |

#### Returns

[`TransformFactory`](../../docs/modules/core_src.md#transformfactory)<`Record`<`string`, `unknown`\>\>[]

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

[vite/src/types.ts:40](https://github.com/JonasKruckenberg/imagetools/blob/edbc774/packages/vite/src/types.ts#L40)

## Contributing

Feel free to dive in! [Open an issue](https://github.com/JonasKruckenberg/imagetools/issues/new) or submit PRs! All
information to get you started hacking on imagetools is in [CONTRIBUTING.md](../../CONTRIBUTING.md)!

## License

[MIT © Jonas Kruckenberg.](./LICENSE)
