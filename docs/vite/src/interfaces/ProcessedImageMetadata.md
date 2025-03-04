[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ProcessedImageMetadata

# Interface: ProcessedImageMetadata

Defined in: packages/core/dist/types.d.ts:4

## Extends

- [`ImageMetadata`](ImageMetadata.md)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### allowUpscale?

> `optional` **allowUpscale**: `boolean`

Defined in: packages/core/dist/types.d.ts:9

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`allowUpscale`](ImageMetadata.md#allowupscale)

***

### aspect?

> `optional` **aspect**: `number`

Defined in: packages/core/dist/types.d.ts:10

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`aspect`](ImageMetadata.md#aspect)

***

### background?

> `optional` **background**: `number` \| \{ `b`: `number`; `g`: `number`; `r`: `number`; \}

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1102

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`background`](ImageMetadata.md#background)

***

### backgroundDirective?

> `optional` **backgroundDirective**: `string`

Defined in: packages/core/dist/types.d.ts:11

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`backgroundDirective`](ImageMetadata.md#backgrounddirective)

***

### blur?

> `optional` **blur**: `number` \| `boolean`

Defined in: packages/core/dist/types.d.ts:12

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`blur`](ImageMetadata.md#blur)

***

### brightness?

> `optional` **brightness**: `number` \| `""`

Defined in: packages/core/dist/types.d.ts:13

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`brightness`](ImageMetadata.md#brightness)

***

### channels?

> `optional` **channels**: `Channels`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1066

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`channels`](ImageMetadata.md#channels)

***

### chromaSubsampling

> **chromaSubsampling**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1072

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`chromaSubsampling`](ImageMetadata.md#chromasubsampling)

***

### compression?

> `optional` **compression**: `"av1"` \| `"hevc"`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1100

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`compression`](ImageMetadata.md#compression)

***

### delay?

> `optional` **delay**: `number`[]

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1082

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`delay`](ImageMetadata.md#delay)

***

### density?

> `optional` **density**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1070

Number of pixels per inch (DPI), if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`density`](ImageMetadata.md#density)

***

### depth?

> `optional` **depth**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1068

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`depth`](ImageMetadata.md#depth)

***

### exif?

> `optional` **exif**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1090

Buffer containing raw EXIF data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`exif`](ImageMetadata.md#exif)

***

### fit?

> `optional` **fit**: `string`

Defined in: packages/core/dist/types.d.ts:14

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`fit`](ImageMetadata.md#fit)

***

### flatten?

> `optional` **flatten**: `true`

Defined in: packages/core/dist/types.d.ts:17

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flatten`](ImageMetadata.md#flatten)

***

### flip?

> `optional` **flip**: `true`

Defined in: packages/core/dist/types.d.ts:15

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flip`](ImageMetadata.md#flip)

***

### flop?

> `optional` **flop**: `true`

Defined in: packages/core/dist/types.d.ts:16

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`flop`](ImageMetadata.md#flop)

***

### format?

> `optional` **format**: keyof FormatEnum

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1056

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`format`](ImageMetadata.md#format)

***

### formatMagick?

> `optional` **formatMagick**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1110

String containing format for images loaded via *magick

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`formatMagick`](ImageMetadata.md#formatmagick)

***

### grayscale?

> `optional` **grayscale**: `true`

Defined in: packages/core/dist/types.d.ts:20

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`grayscale`](ImageMetadata.md#grayscale)

***

### hasAlpha?

> `optional` **hasAlpha**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1088

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hasAlpha`](ImageMetadata.md#hasalpha)

***

### hasProfile?

> `optional` **hasProfile**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1086

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hasProfile`](ImageMetadata.md#hasprofile)

***

### height?

> `optional` **height**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1062

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`height`](ImageMetadata.md#height)

***

### hue?

> `optional` **hue**: `number` \| `""`

Defined in: packages/core/dist/types.d.ts:18

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`hue`](ImageMetadata.md#hue)

***

### icc?

> `optional` **icc**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1092

Buffer containing raw ICC profile data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`icc`](ImageMetadata.md#icc)

***

### image

> **image**: `Sharp`

Defined in: packages/core/dist/types.d.ts:6

***

### invert?

> `optional` **invert**: `true`

Defined in: packages/core/dist/types.d.ts:19

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`invert`](ImageMetadata.md#invert)

***

### iptc?

> `optional` **iptc**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1094

Buffer containing raw IPTC data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`iptc`](ImageMetadata.md#iptc)

***

### isProgressive?

> `optional` **isProgressive**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1074

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`isProgressive`](ImageMetadata.md#isprogressive)

***

### kernel?

> `optional` **kernel**: `"nearest"` \| `"cubic"` \| `"mitchell"` \| `"lanczos2"` \| `"lanczos3"`

Defined in: packages/core/dist/types.d.ts:21

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`kernel`](ImageMetadata.md#kernel)

***

### levels?

> `optional` **levels**: `LevelMetadata`[]

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1104

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`levels`](ImageMetadata.md#levels)

***

### loop?

> `optional` **loop**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1080

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`loop`](ImageMetadata.md#loop)

***

### lossless?

> `optional` **lossless**: `true`

Defined in: packages/core/dist/types.d.ts:22

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`lossless`](ImageMetadata.md#lossless)

***

### median?

> `optional` **median**: `number`

Defined in: packages/core/dist/types.d.ts:23

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`median`](ImageMetadata.md#median)

***

### normalize?

> `optional` **normalize**: `true`

Defined in: packages/core/dist/types.d.ts:24

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`normalize`](ImageMetadata.md#normalize)

***

### orientation?

> `optional` **orientation**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1054

Number value of the EXIF Orientation header, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`orientation`](ImageMetadata.md#orientation)

***

### pageHeight?

> `optional` **pageHeight**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1078

Number of pixels high each page in a multi-page image will be.

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pageHeight`](ImageMetadata.md#pageheight)

***

### pagePrimary?

> `optional` **pagePrimary**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1084

Number of the primary page in a HEIF image

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pagePrimary`](ImageMetadata.md#pageprimary)

***

### pages?

> `optional` **pages**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1076

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pages`](ImageMetadata.md#pages)

***

### pixelDensityDescriptor?

> `optional` **pixelDensityDescriptor**: `string`

Defined in: packages/core/dist/types.d.ts:25

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`pixelDensityDescriptor`](ImageMetadata.md#pixeldensitydescriptor)

***

### position?

> `optional` **position**: `"top"` \| `"right top"` \| `"right"` \| `"right bottom"` \| `"bottom"` \| `"left bottom"` \| `"left"` \| `"left top"` \| `"north"` \| `"northeast"` \| `"east"` \| `"southeast"` \| `"south"` \| `"southwest"` \| `"west"` \| `"northwest"` \| `"center"` \| `"centre"` \| `"entropy"` \| `"attention"`

Defined in: packages/core/dist/types.d.ts:26

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`position`](ImageMetadata.md#position)

***

### progressive?

> `optional` **progressive**: `true`

Defined in: packages/core/dist/types.d.ts:27

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`progressive`](ImageMetadata.md#progressive)

***

### quality?

> `optional` **quality**: `number`

Defined in: packages/core/dist/types.d.ts:28

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`quality`](ImageMetadata.md#quality)

***

### resolutionUnit?

> `optional` **resolutionUnit**: `"inch"` \| `"cm"`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1108

The unit of resolution (density)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`resolutionUnit`](ImageMetadata.md#resolutionunit)

***

### rotate?

> `optional` **rotate**: `number`

Defined in: packages/core/dist/types.d.ts:31

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`rotate`](ImageMetadata.md#rotate)

***

### saturation?

> `optional` **saturation**: `number` \| `""`

Defined in: packages/core/dist/types.d.ts:29

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`saturation`](ImageMetadata.md#saturation)

***

### size?

> `optional` **size**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1058

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`size`](ImageMetadata.md#size)

***

### space?

> `optional` **space**: keyof ColourspaceEnum

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1064

Name of colour space interpretation

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`space`](ImageMetadata.md#space)

***

### src

> **src**: `string`

Defined in: packages/core/dist/types.d.ts:5

***

### subifds?

> `optional` **subifds**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1106

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`subifds`](ImageMetadata.md#subifds)

***

### tifftagPhotoshop?

> `optional` **tifftagPhotoshop**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1098

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`tifftagPhotoshop`](ImageMetadata.md#tifftagphotoshop)

***

### tint?

> `optional` **tint**: `string`

Defined in: packages/core/dist/types.d.ts:30

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`tint`](ImageMetadata.md#tint)

***

### width?

> `optional` **width**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1060

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`width`](ImageMetadata.md#width)

***

### xmp?

> `optional` **xmp**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1096

Buffer containing raw XMP data, if present

#### Inherited from

[`ImageMetadata`](ImageMetadata.md).[`xmp`](ImageMetadata.md#xmp)
