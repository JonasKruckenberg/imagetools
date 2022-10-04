## Table of Contents

- [Background](#background)
- [Blur](#blur)
- [Fit](#fit)
- [Flatten](#flatten)
- [Flip](#flip)
- [Flop](#flop)
- [Format](#format)
- [Grayscale](#grayscale)
- [Hue](#hue)
- [Saturation](#saturation)
- [Brightness](#brightness)
- [Invert](#invert)
- [Kernel](#kernel)
- [Median](#median)
- [Normalize](#normalize)
- [Position](#position)
- [Quality](#quality)
- [Width](#width)
- [Height](#height)
- [Aspect](#aspect)
- [Rotate](#rotate)
- [Tint](#tint)

### Output Directives

- [metadata](#metadata)
- [picture](#picture)
- [source](#source)
- [srcset](#srcset)
- [url](#url)

## Directives

### Background

• **Keyword**: `background`<br> • **Type**: _string_<br>

This instructs various directives (e.g. the [rotate](#rotate)) to use the specified color when filling empty spots in
the image.

The argument will be parsed by the [color-string](https://www.npmjs.com/package/color-string) library so all color
values known from css like rgb, rgba or named colors can be used.

> NOTE: This directive does nothing on it's own, it has to be used in conjunction with another directive.<br> You also
> cannot set multiple values.

• **Example**:

```js
import Image from 'foo.jpg?background=#FFFFFFAA'
import Image from 'foo.jpg?background=hsl(360, 100%, 50%)'
import Image from 'foo.jpg?background=rgb(200, 200, 200)'
import Image from 'foo.jpg?background=blue'
```

---

### Blur

• **Keyword**: `blur`<br> • **Type**: _float_\| _boolean_<br>

Blurs the image. When no argument is provided it performs a fast blur. When an argument between 0.3 and 1000 is provided
it performs a more accurate gaussian blur.

• **Example**:

```js
import Image from 'example.jpg?blur'
import Image from 'exmaple.jpg?blur=0.75'
import Image from 'example.jpg?blur=100'
```

---

### Fit

• **Keyword**: `fit`<br> • **Type**: _cover_\| _contain_ \| _fill_ \| _inside_ \| _outside_ <br>

When both a `width` and `height` are provided, this directive can be used to specify the method by which the image
should **fit**.

• **Example**:

```js
import Image from 'example.jpg?fit=cover'
```

---

### Flatten

• **Keyword**: `flatten`<br> • **Type**: _boolean_<br>

This directive will remove the alpha channel of the image, reducing filesize. Transparent pixels will be merged with the
color set by the [background directive](#background).

---

### Flip

• **Keyword**: `flip`<br> • **Type**: _boolean_<br>

Flip the image about the vertical axis. This step is always performed **after** any rotation.

• **Example**:

```js
import Image from 'example.jpg?flip'
import Image from 'exmaple.jpg?flip=true'
```

---

### Flop

• **Keyword**: `flop`<br> • **Type**: _boolean_<br>

Flop the image about the horizontal axis. This step is always performed **after** any rotation.

• **Example**:

```js
import Image from 'example.jpg?flop'
import Image from 'exmaple.jpg?flop=true'
```

---

### Format

• **Keyword**: `format`<br> • **Type**: _heic_\| _heif_ \| _avif_ \| _jpeg_ \| _jpg_ \| _png_ \| _tiff_ \| _webp_ \|
_gif_<br> • **Shorthands**: `heic`\| `heif` \| `avif` \| `jpg` \|`jpeg` \| `png` \| `tiff` \| `webp` \| (`gif`)<br>

Convert the image into the given format.

> NOTE: Converting to the `gif` format requires libvips compiled with support for ImageMagick or GraphicsMagick See
> [The sharp docs](https://sharp.pixelplumbing.com/install#custom-libvips) for details.

> You cannot use multiple shorthands, use `format` instead.

• **Example**:

```js
import Image from 'example.jpg?format=webp'
import Image from 'example.jpg?png'
import Images from 'example.jpg?format=webp;avif;heic'
```

---

### Grayscale

• **Keyword**: `grayscale`<br> • **Type**: _boolean_<br>

Converts the image to an 8-bit grayscale image.

> This directive will convert the image to the `b-w` colorspace, meaning the resulting image will only have one channel.

• **Example**:

```js
import Image from 'example.jpg?grayscale'
import Image from 'exmaple.jpg?grayscale=true'
```

---

### Hue

• **Keyword**: `hue`<br> • **Type**: _integer_<br>

Adjusts the images hue rotation by the given number of degrees. Commonly used together with [`saturation`](#saturation)
and [`brightness`](#brightness).

---

### Saturation

• **Keyword**: `saturation`<br> • **Type**: _float_<br>

Adjusts the images saturation with the given saturation multiplier. Commonly used together with [`hue`](#hue) and
[`brightness`](#brightness).

---

### Brightness

• **Keyword**: `brightness`<br> • **Type**: _float_<br>

Adjusts the images brightness with the given brightness multiplier. Commonly used together with [`hue`](#hue) and
[`saturation`](#saturation).

---

### Invert

• **Keyword**: `invert`<br> • **Type**: _boolean_<br>

Produces a 'negative' of the image.

• **Example**:

```js
import Image from 'example.jpg?invert'
import Image from 'exmaple.jpg?invert=true'
```

---

### Kernel

• **Keyword**: kernel<br> • **Type**: _nearest_\| _cubic_ \| _mitchell_ \| _lanczos2_ \| _lanczos3_<br>

Use this directive to set a different interpolation kernel when resizing the image.

---

### Median

• **Keyword**: `median`<br> • **Type**: _float_\| _boolean_<br>

Applies a median filter. This is commonly used to remove noise from images.

• **Example**:

```js
import Image from 'example.jpg?median'
import Image from 'exmaple.jpg?median=3'
import Image from 'example.jpg?median=50'
```

---

### Normalize

• **Keyword**: `normalize`<br> • **Type**: _boolean_<br>

'Normalizes' the image by stretching its luminance to cover the full dynamic range. This Enhances the output image
contrast.

• **Example**:

```js
import Image from 'example.jpg?invert'
import Image from 'exmaple.jpg?invert=true'
```

---

### Position

• **Keyword**: `position`<br> • **Type**: _top_\| _right top_ \| _right_ \| _right bottom_ \| _bottom_ \| _left bottom_
\| _left_ \| _left top_ \| _north_ \| _northeast_ \| _east_ \| _southeast_ \| _south_ \| _southwest_ \| _west_ \|
_northwest_ \| _center_ \| _centre_ \| _cover_ \| _entropy_ \| _attention_<br>

When both `width` and `height` are provided AND the fit is one of `fit` of `cover` or `contain`, this directive can be
used to set the position of the image.

See sharps [resize options](https://sharp.pixelplumbing.com/api-resize#resize) for a detailed explanation of each.

---

### Quality

• **Keyword**: `quality`<br> • **Type**: _integer_<br>

All formats (except `gif`) allow the quality to be adjusted by setting this directive.

The argument must be a number between 0 and 100.

> See sharps [Output options](https://sharp.pixelplumbing.com/api-output) for default quality values.

• **Example**:

```js
import Image from 'example.jpg?format=webp&quality=100'
import Image from 'example.jpg?png&quality=200'
import Images from 'example.jpg?avif&quality=10;50;75'
```

---

### Width

• **Keyword**: `width`\| `w`<br> • **Type**: _integer_<br>

Resizes the image to be the specified amount of pixels wide. If not given the height will be scaled accordingly.

• **Example**:

```js
import Image from 'example.jpg?width=200'
import Image from 'example.jpg?w=200'
import Images from 'example.jpg?width=200;400;700'
```

---

### Height

• **Keyword**: `height`\| `h`<br> • **Type**: _integer_<br>

Resizes the image to be the specified amount of pixels tall. If not given the width will be scaled accordingly.

• **Example**:

```js
import Image from 'example.jpg?height=200'
import Image from 'example.jpg?h=200'
import Images from 'example.jpg?height=200;400;700'
```

---

### Aspect

• **Keyword**: `aspect` \| `ar`<br> • **Type**: _string_ \| _number_<br>

Resizes the image to be the specified aspect ratio. Aspect ratio can be defined with a string in the form `16:9` or a
positive number representing the width divided by height (e.g., `1.5` for a `3:2` aspect ratio) If height and width are
both provided, this will be ignored. If height is provided, the width will be scaled accordingly. If width is provided,
the height will be scaled accordingly. If neither height nor width are provided, the image will be cropped to the given
aspect ratio.

• **Example**:

```js
import Image from 'example.jpg?aspect=16:9'
import Image from 'example.jpg?aspect=16:9&height=200'
import Image from 'example.jpg?aspect=16:9&width=200'
import Images from 'example.jpg?aspect=16:9&h=200;400;700'
```

---

### Rotate

• **Keyword**: `rotate`<br> • **Type**: _integer_<br>

Rotate the image by the specified number of degrees.

> NOTE: You can change the background color the empty parts are filled with by setting the [background](#background)
> directive.

• **Example**:

```js
import Image from 'example.jpg`rotate=90'
import Image from 'example.jpg`rotate=68'
import Images from 'example.jpg`rotate=90;180;270'
```

---

### Tint

• **Keyword**: `tint`<br> • **Type**: _string_<br>

Tints the image using the provided chroma while preserving the image luminance. If the image has an alpha channel it
will be untouched.

• **Example**:

```js
import Image from 'example.jpg?tint=#ffaa22'
import Image from 'example.jpg?tint=rgba(10,33,127)'
```

---

### Metadata

• **Keyword**: `metadata` | `meta`<br> • **Type**: _boolean_ | _string[]_<br>

Returns all information collected about the image as a JavaScript object. The directive optionally takes a list of arguments that act as a *whitelist* for the metadata object. You can use it to only import specific image attributes, keeping your bundle size small.

• **Example**:

```js
import Image from 'example.jpg?w=500;900;1200&avif&metadata'
import { height, format } from 'example.jpg?w=700&gif&meta=height;format'
```

### Picture

• **Keyword**: `picture`<br> • **Type**: _boolean_<br>

Returns information about the image necessary to render a `picture` tag as a JavaScript object.

• **Example**:

```js
import image from 'example.jpg?w=500;900;1200&avif;webp;jpg&picture'

let html = '<picture>';
for (const [format, images] of Object.entries(image.sources)) {
  html += `<source srcset={images.map((i) => `${i.src}`).join(', ')} type={'image/' + format} />`;
}
html += `<img src={image.fallback.src} /></picture>`
```

### Source

• **Keyword**: `url`<br> • **Type**: _boolean_<br>

Returns information about the image necessary to render a `source` tag as a JavaScript object. This only takes the image width into consideration.

• **Example**:

```js
import avif from 'example.jpg?w=500;900;1200&avif&source'
import webp from 'example.jpg?w=500;900;1200&webp&source'
import fallback from 'example.jpg?w=700'

const html = `<picture>
    <source srcset="${avif.src} ${avif.w}" type="image/avif" />
    <source srcset="${webp.src} ${webp.w}" type="image/webp" />
    <img src="${fallback}" />
</picture>
```

### Srcset

• **Keyword**: `url`<br> • **Type**: _boolean_<br>

Returns a srcset string of the generated images to be used in a `<picture>` tag. This only takes the image width into consideration.

• **Example**:

```js
import avif from 'example.jpg?w=500;900;1200&avif&srcset'
import webp from 'example.jpg?w=500;900;1200&webp&srcset'
import fallback from 'example.jpg?w=700'

const html = `<picture>
    <source srcset="${avif}" type="image/avif" />
    <source srcset="${webp}" type="image/webp" />
    <img src="${fallback}" />
</picture>
`
```

### URL

• **Keyword**: `url`<br> • **Type**: _boolean_<br>

Returns a URL to the generated image. This is the default when your directives produce only one output image.

• **Example**:

```js
import Image from 'example.jpg?w=500' // the type of Image is a string and it's a URL to the transformed image
```
