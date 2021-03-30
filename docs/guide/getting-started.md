# Getting started

```ts
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"

export default defineConfig({
  plugins: [
    imagetools()
  ]
})
```

Now you can transform image by importing them like this:

```js
import Image from "example.jpg?w=400&h=300&webp"
```


## Basic usage

Transforms are designed to be interoperable, so you start with a buildtool plugin and switch to a serverless function once your project grows and the number of images gets larger. Or switch from an existing image processing server to a compile-time plugin.

This is why all directives are specified in the url as query parameters:
```
<url>?width=300
```

You can have multiple key-value pairs. This will invoke all specified directives and return the transformed image.

## Argumentlist

One strength of imagetools is the ability to generate multiple image versions from one import statement:

```
<url>?width=300;500;700
```

will generate three images with widths of 300, 500 and 700 pixels.<br>
This is not where it ends however, you can have multiple directives with multiple arguments:

```
<url>?width=300;500;700&format=webp;avif;jpg
```

This will generate 9 different images, one for each combination of width and format.

## Shorthands

As you've seen, having a lot of directives on a single image makes the import statement very hard to read.<br>
This is why the most commonly used transforms have shorthands that you can use instead. So writing:
```
<url>?format=webp
```
Is equivalent to writing:
```
<url>?webp
```

## Metadata

Normally you get a single url poiting to the transformed image, or an array of those. There are situations however, where you'd like to have more information about the image, e.g. the images width and height or format.
This is why the special `metadata` (`meta`) directive exists. Instead of returning the url it returns an object holding the image metadata:

```js
import { width, height, format, src } from "example.jpg?width=300&webp"

width // is 300
height // is automatically generated
format // is "webp"
src // is the url pointing to the transformed image

```

Each directive you specified will add it's parsed value to the metadata (like `format = "webp"`) in the above example,
and might even expose more. There are a few keys however that are **always** present:

```ts
interface OutputMetadata {
  src: string // URL of the generated image
  width: number // Width of the iage
  height: number // Height of the image
  format: string // Format of the generated image

  // The following options are the same as sharps input options
  space: string // Name of colour space interpretation
  channels: number // Number of bands e.g. 3 for sRGB, 4 for CMYK
  density: number //  Number of pixels per inch
  depth: string // Name of pixel depth format
  hasAlpha: boolean // presence of an alpha transparency channel
  hasProfile: boolean // presence of an embedded ICC profile
  isProgressive: boolean // indicating whether the image is interlaced using a progressive scan
}
```

> Interested in more ? Read the [spec](../spec.md) or see the [extending guide](extending.md)