[imagetools](../README.md) / [Modules](../modules.md) / [vite/src](../modules/vite_src.md) / ImageMetadata

# Interface: ImageMetadata

[vite/src](../modules/vite_src.md).ImageMetadata

## Hierarchy

- `Metadata`

  ↳ **`ImageMetadata`**

  ↳↳ [`ProcessedImageMetadata`](vite_src.ProcessedImageMetadata.md)

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [allowUpscale](vite_src.ImageMetadata.md#allowupscale)
- [aspect](vite_src.ImageMetadata.md#aspect)
- [background](vite_src.ImageMetadata.md#background)
- [backgroundDirective](vite_src.ImageMetadata.md#backgrounddirective)
- [blur](vite_src.ImageMetadata.md#blur)
- [brightness](vite_src.ImageMetadata.md#brightness)
- [channels](vite_src.ImageMetadata.md#channels)
- [chromaSubsampling](vite_src.ImageMetadata.md#chromasubsampling)
- [compression](vite_src.ImageMetadata.md#compression)
- [delay](vite_src.ImageMetadata.md#delay)
- [density](vite_src.ImageMetadata.md#density)
- [depth](vite_src.ImageMetadata.md#depth)
- [exif](vite_src.ImageMetadata.md#exif)
- [fit](vite_src.ImageMetadata.md#fit)
- [flatten](vite_src.ImageMetadata.md#flatten)
- [flip](vite_src.ImageMetadata.md#flip)
- [flop](vite_src.ImageMetadata.md#flop)
- [format](vite_src.ImageMetadata.md#format)
- [formatMagick](vite_src.ImageMetadata.md#formatmagick)
- [grayscale](vite_src.ImageMetadata.md#grayscale)
- [hasAlpha](vite_src.ImageMetadata.md#hasalpha)
- [hasProfile](vite_src.ImageMetadata.md#hasprofile)
- [height](vite_src.ImageMetadata.md#height)
- [hue](vite_src.ImageMetadata.md#hue)
- [icc](vite_src.ImageMetadata.md#icc)
- [invert](vite_src.ImageMetadata.md#invert)
- [iptc](vite_src.ImageMetadata.md#iptc)
- [isProgressive](vite_src.ImageMetadata.md#isprogressive)
- [kernel](vite_src.ImageMetadata.md#kernel)
- [levels](vite_src.ImageMetadata.md#levels)
- [loop](vite_src.ImageMetadata.md#loop)
- [lossless](vite_src.ImageMetadata.md#lossless)
- [median](vite_src.ImageMetadata.md#median)
- [normalize](vite_src.ImageMetadata.md#normalize)
- [orientation](vite_src.ImageMetadata.md#orientation)
- [pageHeight](vite_src.ImageMetadata.md#pageheight)
- [pagePrimary](vite_src.ImageMetadata.md#pageprimary)
- [pages](vite_src.ImageMetadata.md#pages)
- [pixelDensityDescriptor](vite_src.ImageMetadata.md#pixeldensitydescriptor)
- [position](vite_src.ImageMetadata.md#position)
- [progressive](vite_src.ImageMetadata.md#progressive)
- [quality](vite_src.ImageMetadata.md#quality)
- [resolutionUnit](vite_src.ImageMetadata.md#resolutionunit)
- [rotate](vite_src.ImageMetadata.md#rotate)
- [saturation](vite_src.ImageMetadata.md#saturation)
- [size](vite_src.ImageMetadata.md#size)
- [space](vite_src.ImageMetadata.md#space)
- [subifds](vite_src.ImageMetadata.md#subifds)
- [tifftagPhotoshop](vite_src.ImageMetadata.md#tifftagphotoshop)
- [tint](vite_src.ImageMetadata.md#tint)
- [width](vite_src.ImageMetadata.md#width)
- [xmp](vite_src.ImageMetadata.md#xmp)

## Properties

### allowUpscale

• `Optional` **allowUpscale**: `boolean`

#### Defined in

packages/core/dist/types.d.ts:9

___

### aspect

• `Optional` **aspect**: `number`

#### Defined in

packages/core/dist/types.d.ts:10

___

### background

• `Optional` **background**: `number` \| { `b`: `number` ; `g`: `number` ; `r`: `number`  }

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

Metadata.background

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1003

___

### backgroundDirective

• `Optional` **backgroundDirective**: `string`

#### Defined in

packages/core/dist/types.d.ts:11

___

### blur

• `Optional` **blur**: `number` \| `boolean`

#### Defined in

packages/core/dist/types.d.ts:12

___

### brightness

• `Optional` **brightness**: `number` \| ``""``

#### Defined in

packages/core/dist/types.d.ts:13

___

### channels

• `Optional` **channels**: `Channels`

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

Metadata.channels

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:967

___

### chromaSubsampling

• **chromaSubsampling**: `string`

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

Metadata.chromaSubsampling

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:973

___

### compression

• `Optional` **compression**: ``"av1"`` \| ``"hevc"``

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

Metadata.compression

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1001

___

### delay

• `Optional` **delay**: `number`[]

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

Metadata.delay

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:983

___

### density

• `Optional` **density**: `number`

Number of pixels per inch (DPI), if present

#### Inherited from

Metadata.density

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:971

___

### depth

• `Optional` **depth**: `string`

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

Metadata.depth

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:969

___

### exif

• `Optional` **exif**: `Buffer`

Buffer containing raw EXIF data, if present

#### Inherited from

Metadata.exif

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:991

___

### fit

• `Optional` **fit**: `string`

#### Defined in

packages/core/dist/types.d.ts:14

___

### flatten

• `Optional` **flatten**: ``true``

#### Defined in

packages/core/dist/types.d.ts:17

___

### flip

• `Optional` **flip**: ``true``

#### Defined in

packages/core/dist/types.d.ts:15

___

### flop

• `Optional` **flop**: ``true``

#### Defined in

packages/core/dist/types.d.ts:16

___

### format

• `Optional` **format**: keyof `FormatEnum`

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

Metadata.format

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:957

___

### formatMagick

• `Optional` **formatMagick**: `string`

String containing format for images loaded via *magick

#### Inherited from

Metadata.formatMagick

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1011

___

### grayscale

• `Optional` **grayscale**: ``true``

#### Defined in

packages/core/dist/types.d.ts:20

___

### hasAlpha

• `Optional` **hasAlpha**: `boolean`

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

Metadata.hasAlpha

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:989

___

### hasProfile

• `Optional` **hasProfile**: `boolean`

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

Metadata.hasProfile

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:987

___

### height

• `Optional` **height**: `number`

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

Metadata.height

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:963

___

### hue

• `Optional` **hue**: `number` \| ``""``

#### Defined in

packages/core/dist/types.d.ts:18

___

### icc

• `Optional` **icc**: `Buffer`

Buffer containing raw ICC profile data, if present

#### Inherited from

Metadata.icc

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:993

___

### invert

• `Optional` **invert**: ``true``

#### Defined in

packages/core/dist/types.d.ts:19

___

### iptc

• `Optional` **iptc**: `Buffer`

Buffer containing raw IPTC data, if present

#### Inherited from

Metadata.iptc

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:995

___

### isProgressive

• `Optional` **isProgressive**: `boolean`

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

Metadata.isProgressive

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:975

___

### kernel

• `Optional` **kernel**: ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Defined in

packages/core/dist/types.d.ts:21

___

### levels

• `Optional` **levels**: `LevelMetadata`[]

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

Metadata.levels

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1005

___

### loop

• `Optional` **loop**: `number`

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

Metadata.loop

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:981

___

### lossless

• `Optional` **lossless**: ``true``

#### Defined in

packages/core/dist/types.d.ts:22

___

### median

• `Optional` **median**: `number`

#### Defined in

packages/core/dist/types.d.ts:23

___

### normalize

• `Optional` **normalize**: ``true``

#### Defined in

packages/core/dist/types.d.ts:24

___

### orientation

• `Optional` **orientation**: `number`

Number value of the EXIF Orientation header, if present

#### Inherited from

Metadata.orientation

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:955

___

### pageHeight

• `Optional` **pageHeight**: `number`

Number of pixels high each page in a multi-page image will be.

#### Inherited from

Metadata.pageHeight

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:979

___

### pagePrimary

• `Optional` **pagePrimary**: `number`

Number of the primary page in a HEIF image

#### Inherited from

Metadata.pagePrimary

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:985

___

### pages

• `Optional` **pages**: `number`

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

Metadata.pages

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:977

___

### pixelDensityDescriptor

• `Optional` **pixelDensityDescriptor**: `string`

#### Defined in

packages/core/dist/types.d.ts:25

___

### position

• `Optional` **position**: ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Defined in

packages/core/dist/types.d.ts:26

___

### progressive

• `Optional` **progressive**: ``true``

#### Defined in

packages/core/dist/types.d.ts:27

___

### quality

• `Optional` **quality**: `number`

#### Defined in

packages/core/dist/types.d.ts:28

___

### resolutionUnit

• `Optional` **resolutionUnit**: ``"inch"`` \| ``"cm"``

The unit of resolution (density)

#### Inherited from

Metadata.resolutionUnit

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1009

___

### rotate

• `Optional` **rotate**: `number`

#### Defined in

packages/core/dist/types.d.ts:31

___

### saturation

• `Optional` **saturation**: `number` \| ``""``

#### Defined in

packages/core/dist/types.d.ts:29

___

### size

• `Optional` **size**: `number`

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

Metadata.size

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:959

___

### space

• `Optional` **space**: keyof `ColourspaceEnum`

Name of colour space interpretation

#### Inherited from

Metadata.space

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:965

___

### subifds

• `Optional` **subifds**: `number`

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

Metadata.subifds

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:1007

___

### tifftagPhotoshop

• `Optional` **tifftagPhotoshop**: `Buffer`

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

Metadata.tifftagPhotoshop

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:999

___

### tint

• `Optional` **tint**: `string`

#### Defined in

packages/core/dist/types.d.ts:30

___

### width

• `Optional` **width**: `number`

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

Metadata.width

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:961

___

### xmp

• `Optional` **xmp**: `Buffer`

Buffer containing raw XMP data, if present

#### Inherited from

Metadata.xmp

#### Defined in

node_modules/.pnpm/sharp@0.32.4/node_modules/sharp/lib/index.d.ts:997
