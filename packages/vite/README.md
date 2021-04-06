# vite-imagetools 

<!-- badges -->
![npm (next)](https://img.shields.io/npm/v/vite-imagetools/next)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A toolbox of import directives for [vitejs](https://github.com/vitejs/vite) that can transform your image at compile-time.
All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

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
npm install --save-dev vite-imagetools@next
```

```
yarn add -D vite-imagetools@next
```

## Usage

```ts
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"

export default defineConfig({
  plugins: [
    imagetools()
  ]
})
```

```js
import Image from "example.jpg?w=400&h=300&webp"
```

## Options

### include

• **include**: *string* \| *RegExp* \| (*string* \| *RegExp*)[]

Which paths to include when processing images.

**`default`** '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'

___

### exclude

• **exclude**: *string* \| *RegExp* \| (*string* \| *RegExp*)[]

What paths to exclude when processing images.
This defaults to the public dir to mirror vites behavior.

**`default`** 'public\/**\/*'

___

### extendTransforms

• **extendTransforms**: [*Directive*](docs/modules/types.md#transformFactory)<{}\>[]

You can use this option to extend the builtin list of import directives.
This list will be merged with the builtin directives before applying them to the input image.
See the section [Custom import directives](#custom-import-directives) for details.

**`default`** []

___

### extendOutputFormats

• **extendOutputFormats**: [*OutputFormat*](docs/modules/types.md#outputformat)[]

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.
See the section [Custom output formats](#custom-output-formats) for details.

**`default`** []

### silent

• **silent**: *boolean*

Settings this option to true disables all warnings produced by this plugin.

**`default`** false

### removeMetadata

• **removeMetadata**: *boolean*

Wether to remove potentially private metadata from the image, such as exif tags etc.

**`default`** true

## Contributing

Feel free to dive in! [Open an issue](https://github.com/JonasKruckenberg/imagetools/issues/new) or submit PRs!
All information to get you started hacking on imagetools is in [CONTRIBUTING.md](../../CONTRIBUTING.md)!

## License
[MIT © Jonas Kruckenberg.](./LICENSE)