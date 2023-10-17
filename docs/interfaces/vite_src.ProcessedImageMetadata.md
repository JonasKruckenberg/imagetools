[imagetools](../README.md) / [Modules](../modules.md) / [vite/src](../modules/vite_src.md) / ProcessedImageMetadata

# Interface: ProcessedImageMetadata

[vite/src](../modules/vite_src.md).ProcessedImageMetadata

## Hierarchy

- [`ImageMetadata`](vite_src.ImageMetadata.md)

  ↳ **`ProcessedImageMetadata`**

## Table of contents

### Properties

- [allowUpscale](vite_src.ProcessedImageMetadata.md#allowupscale)
- [aspect](vite_src.ProcessedImageMetadata.md#aspect)
- [background](vite_src.ProcessedImageMetadata.md#background)
- [backgroundDirective](vite_src.ProcessedImageMetadata.md#backgrounddirective)
- [blur](vite_src.ProcessedImageMetadata.md#blur)
- [brightness](vite_src.ProcessedImageMetadata.md#brightness)
- [channels](vite_src.ProcessedImageMetadata.md#channels)
- [chromaSubsampling](vite_src.ProcessedImageMetadata.md#chromasubsampling)
- [compression](vite_src.ProcessedImageMetadata.md#compression)
- [delay](vite_src.ProcessedImageMetadata.md#delay)
- [density](vite_src.ProcessedImageMetadata.md#density)
- [depth](vite_src.ProcessedImageMetadata.md#depth)
- [exif](vite_src.ProcessedImageMetadata.md#exif)
- [fit](vite_src.ProcessedImageMetadata.md#fit)
- [flatten](vite_src.ProcessedImageMetadata.md#flatten)
- [flip](vite_src.ProcessedImageMetadata.md#flip)
- [flop](vite_src.ProcessedImageMetadata.md#flop)
- [format](vite_src.ProcessedImageMetadata.md#format)
- [formatMagick](vite_src.ProcessedImageMetadata.md#formatmagick)
- [grayscale](vite_src.ProcessedImageMetadata.md#grayscale)
- [hasAlpha](vite_src.ProcessedImageMetadata.md#hasalpha)
- [hasProfile](vite_src.ProcessedImageMetadata.md#hasprofile)
- [height](vite_src.ProcessedImageMetadata.md#height)
- [hue](vite_src.ProcessedImageMetadata.md#hue)
- [icc](vite_src.ProcessedImageMetadata.md#icc)
- [image](vite_src.ProcessedImageMetadata.md#image)
- [invert](vite_src.ProcessedImageMetadata.md#invert)
- [iptc](vite_src.ProcessedImageMetadata.md#iptc)
- [isProgressive](vite_src.ProcessedImageMetadata.md#isprogressive)
- [kernel](vite_src.ProcessedImageMetadata.md#kernel)
- [levels](vite_src.ProcessedImageMetadata.md#levels)
- [loop](vite_src.ProcessedImageMetadata.md#loop)
- [lossless](vite_src.ProcessedImageMetadata.md#lossless)
- [median](vite_src.ProcessedImageMetadata.md#median)
- [normalize](vite_src.ProcessedImageMetadata.md#normalize)
- [orientation](vite_src.ProcessedImageMetadata.md#orientation)
- [pageHeight](vite_src.ProcessedImageMetadata.md#pageheight)
- [pagePrimary](vite_src.ProcessedImageMetadata.md#pageprimary)
- [pages](vite_src.ProcessedImageMetadata.md#pages)
- [pixelDensityDescriptor](vite_src.ProcessedImageMetadata.md#pixeldensitydescriptor)
- [position](vite_src.ProcessedImageMetadata.md#position)
- [progressive](vite_src.ProcessedImageMetadata.md#progressive)
- [quality](vite_src.ProcessedImageMetadata.md#quality)
- [resolutionUnit](vite_src.ProcessedImageMetadata.md#resolutionunit)
- [rotate](vite_src.ProcessedImageMetadata.md#rotate)
- [saturation](vite_src.ProcessedImageMetadata.md#saturation)
- [size](vite_src.ProcessedImageMetadata.md#size)
- [space](vite_src.ProcessedImageMetadata.md#space)
- [src](vite_src.ProcessedImageMetadata.md#src)
- [subifds](vite_src.ProcessedImageMetadata.md#subifds)
- [tifftagPhotoshop](vite_src.ProcessedImageMetadata.md#tifftagphotoshop)
- [tint](vite_src.ProcessedImageMetadata.md#tint)
- [width](vite_src.ProcessedImageMetadata.md#width)
- [xmp](vite_src.ProcessedImageMetadata.md#xmp)

## Properties

### allowUpscale

• `Optional` **allowUpscale**: `boolean`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[allowUpscale](vite_src.ImageMetadata.md#allowupscale)

#### Defined in

packages/core/dist/types.d.ts:9

___

### aspect

• `Optional` **aspect**: `number`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[aspect](vite_src.ImageMetadata.md#aspect)

#### Defined in

packages/core/dist/types.d.ts:10

___

### background

• `Optional` **background**: `number` \| { `b`: `number` ; `g`: `number` ; `r`: `number`  }

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[background](vite_src.ImageMetadata.md#background)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1003

___

### backgroundDirective

• `Optional` **backgroundDirective**: `string`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[backgroundDirective](vite_src.ImageMetadata.md#backgrounddirective)

#### Defined in

packages/core/dist/types.d.ts:11

___

### blur

• `Optional` **blur**: `number` \| `boolean`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[blur](vite_src.ImageMetadata.md#blur)

#### Defined in

packages/core/dist/types.d.ts:12

___

### brightness

• `Optional` **brightness**: `number` \| ``""``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[brightness](vite_src.ImageMetadata.md#brightness)

#### Defined in

packages/core/dist/types.d.ts:13

___

### channels

• `Optional` **channels**: `Channels`

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[channels](vite_src.ImageMetadata.md#channels)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:967

___

### chromaSubsampling

• **chromaSubsampling**: `string`

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[chromaSubsampling](vite_src.ImageMetadata.md#chromasubsampling)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:973

___

### compression

• `Optional` **compression**: ``"av1"`` \| ``"hevc"``

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[compression](vite_src.ImageMetadata.md#compression)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1001

___

### delay

• `Optional` **delay**: `number`[]

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[delay](vite_src.ImageMetadata.md#delay)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:983

___

### density

• `Optional` **density**: `number`

Number of pixels per inch (DPI), if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[density](vite_src.ImageMetadata.md#density)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:971

___

### depth

• `Optional` **depth**: `string`

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[depth](vite_src.ImageMetadata.md#depth)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:969

___

### exif

• `Optional` **exif**: `Buffer`

Buffer containing raw EXIF data, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[exif](vite_src.ImageMetadata.md#exif)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:991

___

### fit

• `Optional` **fit**: `string`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[fit](vite_src.ImageMetadata.md#fit)

#### Defined in

packages/core/dist/types.d.ts:14

___

### flatten

• `Optional` **flatten**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[flatten](vite_src.ImageMetadata.md#flatten)

#### Defined in

packages/core/dist/types.d.ts:17

___

### flip

• `Optional` **flip**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[flip](vite_src.ImageMetadata.md#flip)

#### Defined in

packages/core/dist/types.d.ts:15

___

### flop

• `Optional` **flop**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[flop](vite_src.ImageMetadata.md#flop)

#### Defined in

packages/core/dist/types.d.ts:16

___

### format

• `Optional` **format**: keyof `FormatEnum`

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[format](vite_src.ImageMetadata.md#format)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:957

___

### formatMagick

• `Optional` **formatMagick**: `string`

String containing format for images loaded via *magick

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[formatMagick](vite_src.ImageMetadata.md#formatmagick)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1011

___

### grayscale

• `Optional` **grayscale**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[grayscale](vite_src.ImageMetadata.md#grayscale)

#### Defined in

packages/core/dist/types.d.ts:20

___

### hasAlpha

• `Optional` **hasAlpha**: `boolean`

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[hasAlpha](vite_src.ImageMetadata.md#hasalpha)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:989

___

### hasProfile

• `Optional` **hasProfile**: `boolean`

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[hasProfile](vite_src.ImageMetadata.md#hasprofile)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:987

___

### height

• `Optional` **height**: `number`

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[height](vite_src.ImageMetadata.md#height)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:963

___

### hue

• `Optional` **hue**: `number` \| ``""``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[hue](vite_src.ImageMetadata.md#hue)

#### Defined in

packages/core/dist/types.d.ts:18

___

### icc

• `Optional` **icc**: `Buffer`

Buffer containing raw ICC profile data, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[icc](vite_src.ImageMetadata.md#icc)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:993

___

### image

• **image**: `Sharp`

#### Defined in

packages/core/dist/types.d.ts:6

___

### invert

• `Optional` **invert**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[invert](vite_src.ImageMetadata.md#invert)

#### Defined in

packages/core/dist/types.d.ts:19

___

### iptc

• `Optional` **iptc**: `Buffer`

Buffer containing raw IPTC data, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[iptc](vite_src.ImageMetadata.md#iptc)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:995

___

### isProgressive

• `Optional` **isProgressive**: `boolean`

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[isProgressive](vite_src.ImageMetadata.md#isprogressive)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:975

___

### kernel

• `Optional` **kernel**: ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[kernel](vite_src.ImageMetadata.md#kernel)

#### Defined in

packages/core/dist/types.d.ts:21

___

### levels

• `Optional` **levels**: `LevelMetadata`[]

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[levels](vite_src.ImageMetadata.md#levels)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1005

___

### loop

• `Optional` **loop**: `number`

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[loop](vite_src.ImageMetadata.md#loop)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:981

___

### lossless

• `Optional` **lossless**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[lossless](vite_src.ImageMetadata.md#lossless)

#### Defined in

packages/core/dist/types.d.ts:22

___

### median

• `Optional` **median**: `number`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[median](vite_src.ImageMetadata.md#median)

#### Defined in

packages/core/dist/types.d.ts:23

___

### normalize

• `Optional` **normalize**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[normalize](vite_src.ImageMetadata.md#normalize)

#### Defined in

packages/core/dist/types.d.ts:24

___

### orientation

• `Optional` **orientation**: `number`

Number value of the EXIF Orientation header, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[orientation](vite_src.ImageMetadata.md#orientation)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:955

___

### pageHeight

• `Optional` **pageHeight**: `number`

Number of pixels high each page in a multi-page image will be.

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[pageHeight](vite_src.ImageMetadata.md#pageheight)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:979

___

### pagePrimary

• `Optional` **pagePrimary**: `number`

Number of the primary page in a HEIF image

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[pagePrimary](vite_src.ImageMetadata.md#pageprimary)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:985

___

### pages

• `Optional` **pages**: `number`

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[pages](vite_src.ImageMetadata.md#pages)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:977

___

### pixelDensityDescriptor

• `Optional` **pixelDensityDescriptor**: `string`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[pixelDensityDescriptor](vite_src.ImageMetadata.md#pixeldensitydescriptor)

#### Defined in

packages/core/dist/types.d.ts:25

___

### position

• `Optional` **position**: ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[position](vite_src.ImageMetadata.md#position)

#### Defined in

packages/core/dist/types.d.ts:26

___

### progressive

• `Optional` **progressive**: ``true``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[progressive](vite_src.ImageMetadata.md#progressive)

#### Defined in

packages/core/dist/types.d.ts:27

___

### quality

• `Optional` **quality**: `number`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[quality](vite_src.ImageMetadata.md#quality)

#### Defined in

packages/core/dist/types.d.ts:28

___

### resolutionUnit

• `Optional` **resolutionUnit**: ``"inch"`` \| ``"cm"``

The unit of resolution (density)

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[resolutionUnit](vite_src.ImageMetadata.md#resolutionunit)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1009

___

### rotate

• `Optional` **rotate**: `number`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[rotate](vite_src.ImageMetadata.md#rotate)

#### Defined in

packages/core/dist/types.d.ts:31

___

### saturation

• `Optional` **saturation**: `number` \| ``""``

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[saturation](vite_src.ImageMetadata.md#saturation)

#### Defined in

packages/core/dist/types.d.ts:29

___

### size

• `Optional` **size**: `number`

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[size](vite_src.ImageMetadata.md#size)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:959

___

### space

• `Optional` **space**: keyof `ColourspaceEnum`

Name of colour space interpretation

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[space](vite_src.ImageMetadata.md#space)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:965

___

### src

• **src**: `string`

#### Defined in

packages/core/dist/types.d.ts:5

___

### subifds

• `Optional` **subifds**: `number`

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[subifds](vite_src.ImageMetadata.md#subifds)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1007

___

### tifftagPhotoshop

• `Optional` **tifftagPhotoshop**: `Buffer`

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[tifftagPhotoshop](vite_src.ImageMetadata.md#tifftagphotoshop)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:999

___

### tint

• `Optional` **tint**: `string`

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[tint](vite_src.ImageMetadata.md#tint)

#### Defined in

packages/core/dist/types.d.ts:30

___

### width

• `Optional` **width**: `number`

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[width](vite_src.ImageMetadata.md#width)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:961

___

### xmp

• `Optional` **xmp**: `Buffer`

Buffer containing raw XMP data, if present

#### Inherited from

[ImageMetadata](vite_src.ImageMetadata.md).[xmp](vite_src.ImageMetadata.md#xmp)

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:997
