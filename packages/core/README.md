# imagetools-core

<!-- badges -->

![npm (tag)](https://img.shields.io/npm/v/imagetools-core)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![codecov](https://codecov.io/gh/JonasKruckenberg/imagetools/branch/graph/badge.svg?token=bJrFBmuczA&flag=imagetools-core)](https://codecov.io/gh/JonasKruckenberg/imagetools/)

A toolbox of import directives that can transform your image at compile-time. All of the image transformations are
powered by [sharp](https://sharp.pixelplumbing.com).

> This package holds all transforms and core utility functions needed to integrate imagetools with any builtool,<br> or
> to create a standalone transformation server!

> [Read the docs to learn more!](../../docs/README.md)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm install imagetools-core
```

```
yarn add imagetools-core
```

## Usage

```js
import { loadImage, applyTransforms, builtins } from 'imagetools-core'

// loadImageFromDisk is a utility function that creates a sharp instances of the specified image
const image = loadImage('./example.jpg')

// our image configuration
const config = {
  width: '400',
  height: '300',
  format: 'webp'
}

// This function takes our config and an array of transformFactories and creates an array of transforms
// the resulting array of transforms can be cached
const { transforms, warnings } = generateTransforms(config, builtins)

// apply the transforms and transform the given image
const { image: transformedImage, metadata } = await applyTransforms(transforms, image)

transformedImage // a sharp instance of the transformed image
metadata // the image metadata produced by the transforms
```

```js
import { parseURL, resolveConfigs } from 'imagetools-core'

const src = new URL('file:///example.jpg?w=300;500;700&format=webp')

// parses the url query parameters into an array of entries
const parameters = parseURL(src)

// this function handles the ArgumentList logic
// and produces an array of config objects that can be passed to generateTransforms
const configs = resolveConfigs(parameters)
```

## Contributing

Feel free to dive in! [Open an issue](https://github.com/JonasKruckenberg/imagetools/issues/new) or submit PRs! All
information to get you started hacking on imagetools is in [CONTRIBUTING.md](../../CONTRIBUTING.md)!

## License

[MIT © Jonas Kruckenberg.](./LICENSE)
