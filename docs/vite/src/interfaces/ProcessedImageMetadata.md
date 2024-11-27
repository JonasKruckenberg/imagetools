[**imagetools**](../../../README.md) • **Docs**

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ProcessedImageMetadata

# Interface: ProcessedImageMetadata

## Extends

- [`ImageMetadata`](ImageMetadata.md)

## Properties

### allowUpscale?

> `optional` **allowUpscale**: `boolean`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`allowUpscale`](ImageMetadata.md#allowupscale)

#### Defined in

packages/core/dist/types.d.ts:9

***

### aspect?

> `optional` **aspect**: `number`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`aspect`](ImageMetadata.md#aspect)

#### Defined in

packages/core/dist/types.d.ts:10

***

### background?

> `optional` **background**: `number` \| `object`

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`background`](ImageMetadata.md#background)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1102

***

### backgroundDirective?

> `optional` **backgroundDirective**: `string`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`backgroundDirective`](ImageMetadata.md#backgrounddirective)

#### Defined in

packages/core/dist/types.d.ts:11

***

### blur?

> `optional` **blur**: `number` \| `boolean`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`blur`](ImageMetadata.md#blur)

#### Defined in

packages/core/dist/types.d.ts:12

***

### brightness?

> `optional` **brightness**: `number` \| `""`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`brightness`](ImageMetadata.md#brightness)

#### Defined in

packages/core/dist/types.d.ts:13

***

### channels?

> `optional` **channels**: `Channels`

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`channels`](ImageMetadata.md#channels)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1066

***

### chromaSubsampling

> **chromaSubsampling**: `string`

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`chromaSubsampling`](ImageMetadata.md#chromasubsampling)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1072

***

### compression?

> `optional` **compression**: `"av1"` \| `"hevc"`

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`compression`](ImageMetadata.md#compression)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1100

***

### delay?

> `optional` **delay**: `number`[]

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`delay`](ImageMetadata.md#delay)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1082

***

### density?

> `optional` **density**: `number`

Number of pixels per inch (DPI), if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`density`](ImageMetadata.md#density)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1070

***

### depth?

> `optional` **depth**: `string`

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`depth`](ImageMetadata.md#depth)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1068

***

### exif?

> `optional` **exif**: `Buffer`

Buffer containing raw EXIF data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`exif`](ImageMetadata.md#exif)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1090

***

### fit?

> `optional` **fit**: `string`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`fit`](ImageMetadata.md#fit)

#### Defined in

packages/core/dist/types.d.ts:14

***

### flatten?

> `optional` **flatten**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flatten`](ImageMetadata.md#flatten)

#### Defined in

packages/core/dist/types.d.ts:17

***

### flip?

> `optional` **flip**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flip`](ImageMetadata.md#flip)

#### Defined in

packages/core/dist/types.d.ts:15

***

### flop?

> `optional` **flop**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flop`](ImageMetadata.md#flop)

#### Defined in

packages/core/dist/types.d.ts:16

***

### format?

> `optional` **format**: keyof FormatEnum

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`format`](ImageMetadata.md#format)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1056

***

### formatMagick?

> `optional` **formatMagick**: `string`

String containing format for images loaded via *magick

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`formatMagick`](ImageMetadata.md#formatmagick)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1110

***

### grayscale?

> `optional` **grayscale**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`grayscale`](ImageMetadata.md#grayscale)

#### Defined in

packages/core/dist/types.d.ts:20

***

### hasAlpha?

> `optional` **hasAlpha**: `boolean`

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hasAlpha`](ImageMetadata.md#hasalpha)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1088

***

### hasProfile?

> `optional` **hasProfile**: `boolean`

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hasProfile`](ImageMetadata.md#hasprofile)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1086

***

### height?

> `optional` **height**: `number`

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`height`](ImageMetadata.md#height)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1062

***

### hue?

> `optional` **hue**: `number` \| `""`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hue`](ImageMetadata.md#hue)

#### Defined in

packages/core/dist/types.d.ts:18

***

### icc?

> `optional` **icc**: `Buffer`

Buffer containing raw ICC profile data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`icc`](ImageMetadata.md#icc)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1092

***

### image

> **image**: `Sharp`

#### Defined in

packages/core/dist/types.d.ts:6

***

### invert?

> `optional` **invert**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`invert`](ImageMetadata.md#invert)

#### Defined in

packages/core/dist/types.d.ts:19

***

### iptc?

> `optional` **iptc**: `Buffer`

Buffer containing raw IPTC data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`iptc`](ImageMetadata.md#iptc)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1094

***

### isProgressive?

> `optional` **isProgressive**: `boolean`

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`isProgressive`](ImageMetadata.md#isprogressive)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1074

***

### kernel?

> `optional` **kernel**: `"nearest"` \| `"cubic"` \| `"mitchell"` \| `"lanczos2"` \| `"lanczos3"`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`kernel`](ImageMetadata.md#kernel)

#### Defined in

packages/core/dist/types.d.ts:21

***

### levels?

> `optional` **levels**: `LevelMetadata`[]

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`levels`](ImageMetadata.md#levels)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1104

***

### loop?

> `optional` **loop**: `number`

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`loop`](ImageMetadata.md#loop)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1080

***

### lossless?

> `optional` **lossless**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`lossless`](ImageMetadata.md#lossless)

#### Defined in

packages/core/dist/types.d.ts:22

***

### median?

> `optional` **median**: `number`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`median`](ImageMetadata.md#median)

#### Defined in

packages/core/dist/types.d.ts:23

***

### normalize?

> `optional` **normalize**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`normalize`](ImageMetadata.md#normalize)

#### Defined in

packages/core/dist/types.d.ts:24

***

### orientation?

> `optional` **orientation**: `number`

Number value of the EXIF Orientation header, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`orientation`](ImageMetadata.md#orientation)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1054

***

### pageHeight?

> `optional` **pageHeight**: `number`

Number of pixels high each page in a multi-page image will be.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pageHeight`](ImageMetadata.md#pageheight)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1078

***

### pagePrimary?

> `optional` **pagePrimary**: `number`

Number of the primary page in a HEIF image

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pagePrimary`](ImageMetadata.md#pageprimary)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1084

***

### pages?

> `optional` **pages**: `number`

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pages`](ImageMetadata.md#pages)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1076

***

### pixelDensityDescriptor?

> `optional` **pixelDensityDescriptor**: `string`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pixelDensityDescriptor`](ImageMetadata.md#pixeldensitydescriptor)

#### Defined in

packages/core/dist/types.d.ts:25

***

### position?

> `optional` **position**: `"top"` \| `"right top"` \| `"right"` \| `"right bottom"` \| `"bottom"` \| `"left bottom"` \| `"left"` \| `"left top"` \| `"north"` \| `"northeast"` \| `"east"` \| `"southeast"` \| `"south"` \| `"southwest"` \| `"west"` \| `"northwest"` \| `"center"` \| `"centre"` \| `"entropy"` \| `"attention"`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`position`](ImageMetadata.md#position)

#### Defined in

packages/core/dist/types.d.ts:26

***

### progressive?

> `optional` **progressive**: `true`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`progressive`](ImageMetadata.md#progressive)

#### Defined in

packages/core/dist/types.d.ts:27

***

### quality?

> `optional` **quality**: `number`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`quality`](ImageMetadata.md#quality)

#### Defined in

packages/core/dist/types.d.ts:28

***

### resolutionUnit?

> `optional` **resolutionUnit**: `"inch"` \| `"cm"`

The unit of resolution (density)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`resolutionUnit`](ImageMetadata.md#resolutionunit)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1108

***

### rotate?

> `optional` **rotate**: `number`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`rotate`](ImageMetadata.md#rotate)

#### Defined in

packages/core/dist/types.d.ts:31

***

### saturation?

> `optional` **saturation**: `number` \| `""`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`saturation`](ImageMetadata.md#saturation)

#### Defined in

packages/core/dist/types.d.ts:29

***

### size?

> `optional` **size**: `number`

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`size`](ImageMetadata.md#size)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1058

***

### space?

> `optional` **space**: keyof ColourspaceEnum

Name of colour space interpretation

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`space`](ImageMetadata.md#space)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1064

***

### src

> **src**: `string`

#### Defined in

packages/core/dist/types.d.ts:5

***

### subifds?

> `optional` **subifds**: `number`

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`subifds`](ImageMetadata.md#subifds)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1106

***

### tifftagPhotoshop?

> `optional` **tifftagPhotoshop**: `Buffer`

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`tifftagPhotoshop`](ImageMetadata.md#tifftagphotoshop)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1098

***

### tint?

> `optional` **tint**: `string`

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`tint`](ImageMetadata.md#tint)

#### Defined in

packages/core/dist/types.d.ts:30

***

### width?

> `optional` **width**: `number`

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`width`](ImageMetadata.md#width)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1060

***

### xmp?

> `optional` **xmp**: `Buffer`

Buffer containing raw XMP data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`xmp`](ImageMetadata.md#xmp)

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1096
