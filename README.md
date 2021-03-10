# vite-imagetools :toolbox:
<!-- Demo gif -->

<!-- badges -->
[![codecov](https://codecov.io/gh/JonasKruckenberg/vite-imagetools/branch/next/graph/badge.svg?token=ECD3D95LX4)](https://codecov.io/gh/JonasKruckenberg/vite-imagetools)
![npm (tag)](https://img.shields.io/npm/v/vite-imagetools/next)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- Introduction -->
A toolbox of custom import directives that can transform your image at compile-time.
All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

> :warning: This is the development branch of v3! <br>
> Try it out and leave feedback via the issues!<br>

## Features

- **Output modern formats :rocket:**
- **Resize Images :framed_picture:**
- **Easy Srcset generation :link:**
- **Fast in development mode :zap:**
- **Extensible :jigsaw:**
- **Caches transformed images to speed up CI :green_heart:**

## Table of Contents

- [Usage](#usage)
- [Install](#install)
- [Options](#options)
- [Caching](#caching)
- [Import directives](#import-directives)
- [Output formats](#output-formats)
- [Contributing](#contributing)
- [License](#license)

## Usage

Add the plugin to your vite config:
```js
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    imagetools()
  ]
})
```
Images can now be imported from javascript:
```js
import Image from 'example.jpg?width=200&format=webp'
```
or html(e.g. vue templates):
```html
<img src="example.jpg?width=200&format=webp">
```

You can also generate multiple images by adding more values:
```js
import Images from 'example.jpg?width=200;300;400'
```
This will now generate an array of 3 images with width 200, 300 and 400.

Or choose how you want to import your image:
- **Srcset Output**
```html
<source srcset="example.jpg?width=200;300;500&srcset">
```

- **Metadata Output**
```js
import { src, width, height, channels } from 'example.jpg?w=200'
```

> See the sections [Import directives](#import-directives) and [Output formats](#output-formats) for more!

## Install

With npm:
```
npm install --dev vite-imagetools
```
Or with yarn:
```
yarn add --dev vite-imagetools
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

### cache

• **cache**: *string* \| *false*

The path to use as the cache for images, set this option to false to disable caching completely.

**`default`** 'node_modules/.cache/vite-imagetools'

___

### customDirectives

• **customDirectives**: [*Directive*](docs/modules/types.md#directive)<{}\>[]

You can use this option to extend the builtin list of import directives.
This list will be merged with the builtin directives before applying them to the input image.
See the section [Custom import directives](#custom-import-directives) for details.

**`default`** []

___

### customOutputFormats

• **customOutputFormats**: [*OutputFormat*](docs/modules/types.md#outputformat)[]

You can use this option to extend the builtin list of output formats.
This list will be merged with the builtin output formats before determining the format to use.
See the section [Custom output formats](#custom-output-formats) for details.

**`default`** []

___

### force

• **force**: *boolean*

By default vite-imagetools only generates output metadata during development mode
and only generates the actual images in build mode.
Set this option to `true` to override this behaviour.

> NOTE: This option is very much hacking around the idea & restrictions of vite,<br>
> Vite normally does not transpile assets during dev-mode to keep the developer experience as fast as possible.<br>
> Therefore we write the transformed image to a temp folder and pretend that's the 'source' image.<br>
> It is a bit hacky and needs the cache to be enabled.

**`default`** false

___

### silent

• **silent**: *boolean*

Vite-imagetools emits warnings whenever your directives are incorrect.
If you don't want this bevahiour set this option to true to disable all warnings.

**`default`** false

## Caching

Processing a lot of images is quite resource intensive, that's why vite-imagetools caches all generated images on disk.

To take full advantage of this you want to configure your CI provider to persist the cache folder (`node_modules/.cache/vite-imagetools`) between builds.

> While cache eviction is not completely finished, it's a good idea to regularly delete the cache folder<br>
> Otherwhise you end up with gigabytes of wasted disk space!

## Import directives

vite-imagetools is a collection of functions, that can transform your image at compile-time, generate multiple versions etc.<br>
We call these functions **Import Directives** and they pack quite a punch!

> See the [big list of directives](./docs/directives.md) to see all directives vite-imagetools has built in.

### Shorthands

The most common directives allow you to use shorthands:
```js
// for example instead of this
import Image from 'example.jpg?format=webp'
// you can simply write
import Image from 'example.jpg?webp'
```
This allows you to keep you import statements short and readable.

### Multiple directives

You can specify any number of directives by chaining them together with the `&` sign:
```js
import Image from 'example.jpg?width=300&height=700&rotate=45&format=webp'
```
The above example will resize the image, rotate it and then output as webp.

> Under normal circumstances directives will be executed from left to right.<br>
> There are a few excpetions however, for example the `format` directive will always be applied last.

### Multiple arguments

The real power of vite-imagetools comes with specifying multiple arguments for the same directive:

```js
import Images from 'example.jpg?width=300;500;700'
```
This import statement will generate 3 images with width 300, 500 and 700.
```
example.jpg?width=300;500;700
  └-> example.jpg width: 300
  └-> example.jpg width: 500
  └-> example.jpg width: 700
```
This is not where is stops however, you can combine multiple directives with multiple arguments for maximum ease!

```js
import Images from 'example.jpg?width=300;400;700&format=avif;webp'
```
This will generate 6 images in total. One for each combination of imput arguments.
```
example.jpg?format=avif,webp&width=100,200,300
   └-> example.avif width: 100
   └-> example.avif width: 200
   └-> example.avif width: 300
   └-> example.webp width: 100
   └-> example.webp width: 200
   └-> example.webp width: 300
```

### Custom import directives

_TODO_

## Output formats

Depending on your use-case just importing the url of the image might not be enough, <br>
that's why vite-imagetools let's you customize the exported data with output formats.
All the builtin formats are listed below.

> You can extend the list with the `customOutputFormats` option. See [Custom output formats](#custom-output-formats)

### url

This is the default format, it returns the url of the generated image.

```js
import imageUrl from 'example.jpg?width=300'
```

> NOTE: If the specified directive generates multiple images the output will be an array of strings!
>```js
> import imageUrls from 'example.jpg?width=300,400,500'
>
> // imageUrls will be an Array
> console.log(imageUrls)
>```

### metadata

You can import the whole set of image metadata by adding the `metadata` directive:

```jsx
import { src, width, height, format, channels } from 'example.jpg?width=300&webp?metadata'

// the src attribute holds the url to the image
const image = <img src={src}>
```

> NOTE: If the specified directive generates multiple images the output will be an array!
> ```jsx
> import images from 'example.jpg?width=300,400,500?metadata'
>
> // images is an array now
> const component => images.map(({src}) => <img src={src}>)
> ```

### srcset

You can import a fully generated srcset for your images like so:
```html
<source srcset="example.jpg?width=200,300,400&srcset">
```
will compile to:
```html
<source srcset="example.jpg 200w, example.jpg 300w, example.jpg 400w">
```

> This only works for different widths at the moment.

### Custom output formats

If the builtin output formats do not satisfy your needs you can easily extend add a custom format.
An output format is basically a function gets the outputMetadata objects and returns some value.

> NOTE: While you can return any value from your format, it has to be JSON serializeable if you have json.stringify truned on!

So a format that only exports the width and height for some reason would look like this:
```ts
export const myCustomFormat: OutputFormat = (src: URL, outputMetadatas: Record<string, any>[]) => {
    // you always get an array of metdatas
    const out: string[] = outputMetadatas.map(metadata => ({ width, metadata.width, height: metadata.height }))

    // this mirrors the behaviour of the builtin formats
    // by returning the first element if only one is present
    return out.length == 1 ? out[0] : out
}
```

Finally you have to tell vite-imagetools to take your format into consideration:
```js
import { imagetools } from 'vite-imagetools@next'

export default defineConfig({
  plugins: [
    imagetools({
        customOutputFormats: [myCustomFormat]
    })
  ]
})
```

## Contributing

## License
[MIT © Jonas Kruckenberg.](./LICENSE)
