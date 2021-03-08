# Import directives

## Table of Contents

- [Format](#format)
- [Quality](#quality)
- [Width](#width)
- [Height](#height)
- [Fit](#fit)
- [Position](#position)
- [Kernel](#kernel)
- [Rotate](#rotate)
- [Background](#background)

### Format
• **Keyword**: `format`<br>
• **Type**: _heic_ \| _heif_ \| _avif_ \| _jpeg_ \| _jpg_ \| _png_ \| _tiff_ \| _webp_ \| _gif_<br>
• **Shorthands**: `heic` \| `heif` \| `avif` \| `jpg` \|`jpeg` \| `png` \| `tiff` \| `webp` \| (`gif`)

> NOTE: Converting to the `gif` format requires libvips compiled with support for ImageMagick or GraphicsMagick
> See [The sharp docs](https://sharp.pixelplumbing.com/install#custom-libvips) for details.

> You cannot use multiple shorthands, use `format` instead.

• **Example**:
```js
import Image from 'example.jpg?format=webp'
import Image from 'examepl.jpg?png'
import Images from 'examepl.jpg?format=webp,avif,heic'
```

___


### Quality
• **Keyword**: `quality`<br>
• **Type**: _integer_

All formats (except `gif`) allow the quality to be adjusted by setting this directive.

It has to be a number between 0 and 100.

> See sharps [Output options](https://sharp.pixelplumbing.com/api-output) for default quality values.

• **Example**:
```js
import Image from 'example.jpg?format=webp&quality=100'
import Image from 'examepl.jpg?png&quality=200'
import Images from 'examepl.jpg?avif&quality=10,50,75'
```

___


### Width
• **Keyword**: `width` \| `w`<br>
• **Type**: _integer_

Resizes the image to be the specified amount of pixels wide. If not given the height will be scaled accordingly.

• **Example**:
```js
import Image from 'example.jpg?width=200'
import Image from 'examepl.jpg?w=200'
import Images from 'examepl.jpg?width=200,400,700'
```

___


### Height
• **Keyword**: `height` \| `h`
• **Type**: _integer_

Resizes the image to be the specified amount of pixels tall. If not given the width will be scaled accordingly.

• **Example**:
```js
import Image from 'example.jpg?height=200'
import Image from 'examepl.jpg?h=200'
import Images from 'examepl.jpg?height=200,400,700'
```

___


### Fit
• **Keyword**: `fit`
• **Type**: _cover_ \| _contain_ \| _fill_ \| _inside_ \| _outside_ 

When both a `width` and `height` are provided, this directive can be used to specify the method by which the image should **fit**.

___

### Position
• **Keyword**: `position`
• **Type**: _top_ \| _right top_ \| _right_ \| _right bottom_ \| _bottom_ \| _left bottom_ \| _left_ \| _left top_ \|
    _north_ \| _northeast_ \| _east_ \| _southeast_ \| _south_ \| _southwest_ \| _west_ \| _northwest_ \| _center_ \| _centre_ \|
    _cover_ \| _entropy_ \| _attention_

When both `width` and `height` are provided AND the fit is one of `fit` of `cover` or `contain`, 
this directive can be used to set the position of the image.

See sharps [resize options](https://sharp.pixelplumbing.com/api-resize#resize) for a detailed explanation of each.

___

### Kernel
• **Keyword**: `kernel`
• **Type**: _nearest_ \| _cubic_ \| _mitchell_ \| _lanczos2_ \| _lanczos3_

Use this directive to set a different interpolation kernel when resizing the image.

___

### Rotate
• **Keyword**: `rotate`<br>
• **Type**: _integer_

Rotate the image by the specified number of degrees.

> NOTE: You can change the background color the empty parts are filled with by setting the [background](#background) directive.

• **Example**:
```js
import Image from 'example.jpg`rotate=90'
import Image from 'example.jpg`rotate=68'
import Images from 'example.jpg`rotate=90,180,270'
```

___

### Background
• **Keyword**: `background`<br>
• **Type**: _string_

This instructs various directives (e.g. the [rotate](#rotate)) to use the specified color when filling empty spots in the image.

The argument will be parsed by the [color-string](https://www.npmjs.com/package/color-string) library so css all color features can be used.

> NOTE: This directive does nothing on it's own, it has to be used in conjunction with another directive.<br>
> You also cannot set multiple values.

• **Example**:
```js
import Image from 'foo.jpg`background=#FFFFFFAA'
import Image from 'foo.jpg`background=hsl(360, 100%, 50%)'
import Image from 'foo.jpg`background=rgb(200, 200, 200)'
```

___

### Flip
• **Keyword**: `flip`
• **Type**: _boolean_

Flip the image image about the vertical axis. This step is always performed **after** any rotation.


• **Example**:
```js
import Image from 'example.jpg?flip'
import Image from 'exmaple.jpg?flip=true'
```

___

### Flop
• **Keyword**: `flop`
• **Type**: _boolean_

Flop the image image about the horizontal axis. This step is always performed **after** any rotation.

• **Example**:
```js
import Image from 'example.jpg?flop'
import Image from 'exmaple.jpg?flop=true'
```

___

### Blur
• **Keyword**: `blur`
• **Type**: _float_

Blurs the image. When no argument is provided it performs a fast blur.
When an argument between 0.3 and 1000 is provided it performs a more accurate gaussian blur.

• **Example**:
```js
import Image from 'example.jpg?blur'
import Image from 'exmaple.jpg?blur=0.75'
import Image from 'example.jpg?blur=100'
```
___

### Invert
• **Keyword**: `invert`
• **Type**: _boolean_

Produces a 'negative' of the image.

• **Example**:
```js
import Image from 'example.jpg?invert'
import Image from 'exmaple.jpg?invert=true'
```
