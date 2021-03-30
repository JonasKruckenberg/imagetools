# vite-imagetools

A toolbox of import directives for [vitejs](https://github.com/vitejs/vite) that can transform your image at compile-time.
All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

## Features

- **Output modern formats :rocket:**
- **Resize Images :framed_picture:**
- **Easy Srcset generation :link:**
- **Fast in development mode :zap:**
- **Removes Image Metadata :lock:**
- **Extensible :jigsaw:**

## Table of Contents

- [Usage](#usage)
- [Install](#install)
- [Options](#options)
- [Caching](#caching)
- [Output formats](#output-formats)
- [Extending vite-imagetools](#extending-vite-imagetools)
- [Contributing](#contributing)
- [License](#license)

## Usage

You first have to add imagetools to your config file:
```js
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    imagetools()
  ]
})
```

Import directives are basically functions that will transforn your image.
You can specify what functions to run on you image via url query parameters:

```js
import Image from 'example.jpg?width=400'
```

Vite-imagetools comes with a [wide variety of import deirectives](https://github.com/JonasKruckenberg/vite-imagetools/blob/8e44cb95493fdba7f92c2fa1811e95eb33956820/docs/directives.md) that you can mix and match to get exactly the image you want!
The following example will generate an image that has a width of 500 pixels, is rotated 45 degrees and blured slightly:

```js
import Image from 'example.jpg?width=500&rotate=45&blur=10'
```

> You can even create your own import directives! Check out [Extending vite-imagetools](#extending-vite-imagetools)

You can also provide multiple arguments to each directive:
```js
import Image from 'example.jpg?width=300;500;700'
```
This will generate 3 different images for each width.

## Options

## Extending vite-imagetools