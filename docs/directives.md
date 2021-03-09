# Import Directives

## Table of Contents

- [Background](#background)
- [Blur](#blur)
- [Fit](#fit)
- [Flatten](#flatten)
- [Flip](#flip)
- [Flop](#flop)
- [Format](#format)
- [Grayscale](#grayscale)
- [Invert](#invert)
- [Kernel](#kernel)
- [Median](#median)
- [Normalize](#normalize)
- [Position](#position)
- [Quality](#quality)
- [Width](#width)
- [Height](#height)
- [Tint](#tint)


### Background
• **Keyword**: `background`<br>
• **Type**: _string_<br>

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

### Blur
• **Keyword**: `blur`<br>
• **Type**: _float_\| _boolean_<br>

Blurs the image. When no argument is provided it performs a fast blur.
When an argument between 0.3 and 1000 is provided it performs a more accurate gaussian blur.


• **Example**:  
```js
  import Image from 'example.jpg?blur'
  import Image from 'exmaple.jpg?blur=0.75'
  import Image from 'example.jpg?blur=100'
```

___

### Fit
• **Keyword**: `fit`<br>
• **Type**: _cover_\| _contain_ \| _fill_ \| _inside_ \| _outside_ <br>

When both a `width` and `height` are provided, 
this directive can be used to specify the method by which the image should **fit**.


undefined
___

### Flatten
• **Keyword**: `flatten`<br>
• **Type**: _boolean_<br>

This directive will remove the aplha channel of the image, reducing filesize.
Transparent pixels will be merged with the color set by the [background directive](#background).


undefined
___

### Flip
• **Keyword**: `flip`<br>
• **Type**: _boolean_<br>

Flip the image image about the vertical axis. 
This step is always performed **after** any rotation.


• **Example**:  
```js
import Image from 'example.jpg?flip'
import Image from 'exmaple.jpg?flip=true'
```

___

### Flop
• **Keyword**: `flop`<br>
• **Type**: _boolean_<br>

Flop the image image about the horizontal axis. 
This step is always performed **after** any rotation.


• **Example**:  
```js
import Image from 'example.jpg?flop'
import Image from 'exmaple.jpg?flop=true'
```

___

### Format
• **Keyword**: `format`<br>
• **Type**: _heic_\| _heif_ \| _avif_ \| _jpeg_ \| _jpg_ \| _png_ \| _tiff_ \| _webp_ \| _gif_<br>
• **Shorthands**: `heic`\| `heif` \| `avif` \| `jpg` \|`jpeg` \| `png` \| `tiff` \| `webp` \| (`gif`)<br>

Convert the image into the given format.

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

### Grayscale
• **Keyword**: `grayscale`<br>
• **Type**: _boolean_<br>

Converts the image to an 8-bit grayscale image.

> This directive will convert the image to the `b-w` colorspace, 
> meaning the resulting image will only have one channel.


• **Example**:  
```js
import Image from 'example.jpg?grayscale'
import Image from 'exmaple.jpg?grayscale=true'
```

___

### Invert
• **Keyword**: `invert`<br>
• **Type**: _boolean_<br>

Produces a 'negative' of the image.


• **Example**:  
```js
import Image from 'example.jpg?invert'
import Image from 'exmaple.jpg?invert=true'
```

___

### Kernel
• **Keyword**: kernel<br>
• **Type**: _nearest_\| _cubic_ \| _mitchell_ \| _lanczos2_ \| _lanczos3_<br>

Use this directive to set a different interpolation kernel when resizing the image.


undefined
___

### Median
• **Keyword**: `median`<br>
• **Type**: _float_\| _boolean_<br>

Applies a median filter. This is commonly used to remove noise from images.


• **Example**:  
```js
  import Image from 'example.jpg?median'
  import Image from 'exmaple.jpg?median=3'
  import Image from 'example.jpg?median=50'
```

___

### Normalize
• **Keyword**: `normalize`<br>
• **Type**: _boolean_<br>

'Normalizes' the image by stretching its luminance to cover the full dynamic range.
This Eenhances the output image contrast.


• **Example**:  
```js
import Image from 'example.jpg?invert'
import Image from 'exmaple.jpg?invert=true'
```

___

### Position
• **Keyword**: `position`<br>
• **Type**: _top_\| _right top_ \| _right_ \| _right bottom_ \| _bottom_ \| _left bottom_ \| _left_ \| _left top_ \|
    _north_ \| _northeast_ \| _east_ \| _southeast_ \| _south_ \| _southwest_ \| _west_ \| _northwest_ \| _center_ \| _centre_ \|
    _cover_ \| _entropy_ \| _attention_<br>

When both `width` and `height` are provided AND the fit is one of `fit` of `cover` or `contain`, 
this directive can be used to set the position of the image.

See sharps [resize options](https://sharp.pixelplumbing.com/api-resize#resize) for a detailed explanation of each.


undefined
___

### Quality
• **Keyword**: `quality`<br>
• **Type**: _integer_<br>

All formats (except `gif`) allow the quality to be adjusted by setting this directive.

The argument must be a number between 0 and 100.

> See sharps [Output options](https://sharp.pixelplumbing.com/api-output) for default quality values.


• **Example**:  
```js
import Image from 'example.jpg?format=webp&quality=100'
import Image from 'examepl.jpg?png&quality=200'
import Images from 'examepl.jpg?avif&quality=10,50,75'
```

___

### Width
• **Keyword**: `width`\| `w`<br>
• **Type**: _integer_<br>

Resizes the image to be the specified amount of pixels wide. 
If not given the height will be scaled accordingly.


• **Example**:  
```js
import Image from 'example.jpg?width=200'
import Image from 'examepl.jpg?w=200'
import Images from 'examepl.jpg?width=200,400,700'
```

___

### Height
• **Keyword**: `height`\| `h`<br>
• **Type**: _integer_<br>

Resizes the image to be the specified amount of pixels tall. 
If not given the width will be scaled accordingly.


• **Example**:  
```js
import Image from 'example.jpg?height=200'
import Image from 'examepl.jpg?h=200'
import Images from 'examepl.jpg?height=200,400,700'
```

___

### Tint
• **Keyword**: `tint`<br>
• **Type**: _string_<br>

Tints the image using the provided chroma while preserving the image luminance. 
If the image has han alpha channel it will be untouched.


undefined

