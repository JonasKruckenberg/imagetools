[imagetools](../README.md) / [Modules](../modules.md) / [core/src](../modules/core_src.md) / ProcessedImageMetadata

# Interface: ProcessedImageMetadata

[core/src](../modules/core_src.md).ProcessedImageMetadata

## Hierarchy

- [`ImageMetadata`](core_src.ImageMetadata.md)

  ↳ **`ProcessedImageMetadata`**

## Table of contents

### Properties

- [allowUpscale](core_src.ProcessedImageMetadata.md#allowupscale)
- [aspect](core_src.ProcessedImageMetadata.md#aspect)
- [background](core_src.ProcessedImageMetadata.md#background)
- [backgroundDirective](core_src.ProcessedImageMetadata.md#backgrounddirective)
- [blur](core_src.ProcessedImageMetadata.md#blur)
- [brightness](core_src.ProcessedImageMetadata.md#brightness)
- [channels](core_src.ProcessedImageMetadata.md#channels)
- [chromaSubsampling](core_src.ProcessedImageMetadata.md#chromasubsampling)
- [compression](core_src.ProcessedImageMetadata.md#compression)
- [delay](core_src.ProcessedImageMetadata.md#delay)
- [density](core_src.ProcessedImageMetadata.md#density)
- [depth](core_src.ProcessedImageMetadata.md#depth)
- [exif](core_src.ProcessedImageMetadata.md#exif)
- [fit](core_src.ProcessedImageMetadata.md#fit)
- [flatten](core_src.ProcessedImageMetadata.md#flatten)
- [flip](core_src.ProcessedImageMetadata.md#flip)
- [flop](core_src.ProcessedImageMetadata.md#flop)
- [format](core_src.ProcessedImageMetadata.md#format)
- [formatMagick](core_src.ProcessedImageMetadata.md#formatmagick)
- [grayscale](core_src.ProcessedImageMetadata.md#grayscale)
- [hasAlpha](core_src.ProcessedImageMetadata.md#hasalpha)
- [hasProfile](core_src.ProcessedImageMetadata.md#hasprofile)
- [height](core_src.ProcessedImageMetadata.md#height)
- [hue](core_src.ProcessedImageMetadata.md#hue)
- [icc](core_src.ProcessedImageMetadata.md#icc)
- [image](core_src.ProcessedImageMetadata.md#image)
- [invert](core_src.ProcessedImageMetadata.md#invert)
- [iptc](core_src.ProcessedImageMetadata.md#iptc)
- [isProgressive](core_src.ProcessedImageMetadata.md#isprogressive)
- [kernel](core_src.ProcessedImageMetadata.md#kernel)
- [levels](core_src.ProcessedImageMetadata.md#levels)
- [loop](core_src.ProcessedImageMetadata.md#loop)
- [lossless](core_src.ProcessedImageMetadata.md#lossless)
- [median](core_src.ProcessedImageMetadata.md#median)
- [normalize](core_src.ProcessedImageMetadata.md#normalize)
- [orientation](core_src.ProcessedImageMetadata.md#orientation)
- [pageHeight](core_src.ProcessedImageMetadata.md#pageheight)
- [pagePrimary](core_src.ProcessedImageMetadata.md#pageprimary)
- [pages](core_src.ProcessedImageMetadata.md#pages)
- [pixelDensityDescriptor](core_src.ProcessedImageMetadata.md#pixeldensitydescriptor)
- [position](core_src.ProcessedImageMetadata.md#position)
- [progressive](core_src.ProcessedImageMetadata.md#progressive)
- [quality](core_src.ProcessedImageMetadata.md#quality)
- [resolutionUnit](core_src.ProcessedImageMetadata.md#resolutionunit)
- [rotate](core_src.ProcessedImageMetadata.md#rotate)
- [saturation](core_src.ProcessedImageMetadata.md#saturation)
- [size](core_src.ProcessedImageMetadata.md#size)
- [space](core_src.ProcessedImageMetadata.md#space)
- [src](core_src.ProcessedImageMetadata.md#src)
- [subifds](core_src.ProcessedImageMetadata.md#subifds)
- [tifftagPhotoshop](core_src.ProcessedImageMetadata.md#tifftagphotoshop)
- [tint](core_src.ProcessedImageMetadata.md#tint)
- [width](core_src.ProcessedImageMetadata.md#width)
- [xmp](core_src.ProcessedImageMetadata.md#xmp)

## Properties

### allowUpscale

• `Optional` **allowUpscale**: `boolean`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[allowUpscale](core_src.ImageMetadata.md#allowupscale)

#### Defined in

[packages/core/src/types.ts:11](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L11)

___

### aspect

• `Optional` **aspect**: `number`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[aspect](core_src.ImageMetadata.md#aspect)

#### Defined in

[packages/core/src/types.ts:12](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L12)

___

### background

• `Optional` **background**: `number` \| { `b`: `number` ; `g`: `number` ; `r`: `number`  }

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[background](core_src.ImageMetadata.md#background)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1003

___

### backgroundDirective

• `Optional` **backgroundDirective**: `string`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[backgroundDirective](core_src.ImageMetadata.md#backgrounddirective)

#### Defined in

[packages/core/src/types.ts:13](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L13)

___

### blur

• `Optional` **blur**: `number` \| `boolean`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[blur](core_src.ImageMetadata.md#blur)

#### Defined in

[packages/core/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L14)

___

### brightness

• `Optional` **brightness**: `number` \| ``""``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[brightness](core_src.ImageMetadata.md#brightness)

#### Defined in

[packages/core/src/types.ts:15](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L15)

___

### channels

• `Optional` **channels**: `Channels`

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[channels](core_src.ImageMetadata.md#channels)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:967

___

### chromaSubsampling

• **chromaSubsampling**: `string`

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[chromaSubsampling](core_src.ImageMetadata.md#chromasubsampling)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:973

___

### compression

• `Optional` **compression**: ``"av1"`` \| ``"hevc"``

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[compression](core_src.ImageMetadata.md#compression)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1001

___

### delay

• `Optional` **delay**: `number`[]

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[delay](core_src.ImageMetadata.md#delay)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:983

___

### density

• `Optional` **density**: `number`

Number of pixels per inch (DPI), if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[density](core_src.ImageMetadata.md#density)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:971

___

### depth

• `Optional` **depth**: `string`

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[depth](core_src.ImageMetadata.md#depth)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:969

___

### exif

• `Optional` **exif**: `Buffer`

Buffer containing raw EXIF data, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[exif](core_src.ImageMetadata.md#exif)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:991

___

### fit

• `Optional` **fit**: `string`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[fit](core_src.ImageMetadata.md#fit)

#### Defined in

[packages/core/src/types.ts:16](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L16)

___

### flatten

• `Optional` **flatten**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[flatten](core_src.ImageMetadata.md#flatten)

#### Defined in

[packages/core/src/types.ts:19](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L19)

___

### flip

• `Optional` **flip**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[flip](core_src.ImageMetadata.md#flip)

#### Defined in

[packages/core/src/types.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L17)

___

### flop

• `Optional` **flop**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[flop](core_src.ImageMetadata.md#flop)

#### Defined in

[packages/core/src/types.ts:18](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L18)

___

### format

• `Optional` **format**: keyof `FormatEnum`

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[format](core_src.ImageMetadata.md#format)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:957

___

### formatMagick

• `Optional` **formatMagick**: `string`

String containing format for images loaded via *magick

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[formatMagick](core_src.ImageMetadata.md#formatmagick)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1011

___

### grayscale

• `Optional` **grayscale**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[grayscale](core_src.ImageMetadata.md#grayscale)

#### Defined in

[packages/core/src/types.ts:22](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L22)

___

### hasAlpha

• `Optional` **hasAlpha**: `boolean`

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[hasAlpha](core_src.ImageMetadata.md#hasalpha)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:989

___

### hasProfile

• `Optional` **hasProfile**: `boolean`

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[hasProfile](core_src.ImageMetadata.md#hasprofile)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:987

___

### height

• `Optional` **height**: `number`

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[height](core_src.ImageMetadata.md#height)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:963

___

### hue

• `Optional` **hue**: `number` \| ``""``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[hue](core_src.ImageMetadata.md#hue)

#### Defined in

[packages/core/src/types.ts:20](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L20)

___

### icc

• `Optional` **icc**: `Buffer`

Buffer containing raw ICC profile data, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[icc](core_src.ImageMetadata.md#icc)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:993

___

### image

• **image**: `Sharp`

#### Defined in

[packages/core/src/types.ts:7](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L7)

___

### invert

• `Optional` **invert**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[invert](core_src.ImageMetadata.md#invert)

#### Defined in

[packages/core/src/types.ts:21](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L21)

___

### iptc

• `Optional` **iptc**: `Buffer`

Buffer containing raw IPTC data, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[iptc](core_src.ImageMetadata.md#iptc)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:995

___

### isProgressive

• `Optional` **isProgressive**: `boolean`

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[isProgressive](core_src.ImageMetadata.md#isprogressive)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:975

___

### kernel

• `Optional` **kernel**: ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[kernel](core_src.ImageMetadata.md#kernel)

#### Defined in

[packages/core/src/types.ts:23](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L23)

___

### levels

• `Optional` **levels**: `LevelMetadata`[]

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[levels](core_src.ImageMetadata.md#levels)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1005

___

### loop

• `Optional` **loop**: `number`

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[loop](core_src.ImageMetadata.md#loop)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:981

___

### lossless

• `Optional` **lossless**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[lossless](core_src.ImageMetadata.md#lossless)

#### Defined in

[packages/core/src/types.ts:24](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L24)

___

### median

• `Optional` **median**: `number`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[median](core_src.ImageMetadata.md#median)

#### Defined in

[packages/core/src/types.ts:25](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L25)

___

### normalize

• `Optional` **normalize**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[normalize](core_src.ImageMetadata.md#normalize)

#### Defined in

[packages/core/src/types.ts:26](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L26)

___

### orientation

• `Optional` **orientation**: `number`

Number value of the EXIF Orientation header, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[orientation](core_src.ImageMetadata.md#orientation)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:955

___

### pageHeight

• `Optional` **pageHeight**: `number`

Number of pixels high each page in a multi-page image will be.

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[pageHeight](core_src.ImageMetadata.md#pageheight)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:979

___

### pagePrimary

• `Optional` **pagePrimary**: `number`

Number of the primary page in a HEIF image

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[pagePrimary](core_src.ImageMetadata.md#pageprimary)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:985

___

### pages

• `Optional` **pages**: `number`

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[pages](core_src.ImageMetadata.md#pages)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:977

___

### pixelDensityDescriptor

• `Optional` **pixelDensityDescriptor**: `string`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[pixelDensityDescriptor](core_src.ImageMetadata.md#pixeldensitydescriptor)

#### Defined in

[packages/core/src/types.ts:27](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L27)

___

### position

• `Optional` **position**: ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[position](core_src.ImageMetadata.md#position)

#### Defined in

[packages/core/src/types.ts:28](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L28)

___

### progressive

• `Optional` **progressive**: ``true``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[progressive](core_src.ImageMetadata.md#progressive)

#### Defined in

[packages/core/src/types.ts:29](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L29)

___

### quality

• `Optional` **quality**: `number`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[quality](core_src.ImageMetadata.md#quality)

#### Defined in

[packages/core/src/types.ts:30](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L30)

___

### resolutionUnit

• `Optional` **resolutionUnit**: ``"inch"`` \| ``"cm"``

The unit of resolution (density)

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[resolutionUnit](core_src.ImageMetadata.md#resolutionunit)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1009

___

### rotate

• `Optional` **rotate**: `number`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[rotate](core_src.ImageMetadata.md#rotate)

#### Defined in

[packages/core/src/types.ts:33](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L33)

___

### saturation

• `Optional` **saturation**: `number` \| ``""``

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[saturation](core_src.ImageMetadata.md#saturation)

#### Defined in

[packages/core/src/types.ts:31](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L31)

___

### size

• `Optional` **size**: `number`

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[size](core_src.ImageMetadata.md#size)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:959

___

### space

• `Optional` **space**: keyof `ColourspaceEnum`

Name of colour space interpretation

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[space](core_src.ImageMetadata.md#space)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:965

___

### src

• **src**: `string`

#### Defined in

[packages/core/src/types.ts:6](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L6)

___

### subifds

• `Optional` **subifds**: `number`

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[subifds](core_src.ImageMetadata.md#subifds)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1007

___

### tifftagPhotoshop

• `Optional` **tifftagPhotoshop**: `Buffer`

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[tifftagPhotoshop](core_src.ImageMetadata.md#tifftagphotoshop)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:999

___

### tint

• `Optional` **tint**: `string`

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[tint](core_src.ImageMetadata.md#tint)

#### Defined in

[packages/core/src/types.ts:32](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L32)

___

### width

• `Optional` **width**: `number`

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[width](core_src.ImageMetadata.md#width)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:961

___

### xmp

• `Optional` **xmp**: `Buffer`

Buffer containing raw XMP data, if present

#### Inherited from

[ImageMetadata](core_src.ImageMetadata.md).[xmp](core_src.ImageMetadata.md#xmp)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:997
