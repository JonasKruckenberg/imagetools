[**imagetools**](../../../README.md) • **Docs**

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / ImageMetadata

# Interface: ImageMetadata

## Extends

- `Metadata`

## Extended by

- [`ProcessedImageMetadata`](ProcessedImageMetadata.md)

## Indexable

 \[`key`: `string`\]: `unknown`

## Properties

### allowUpscale?

> `optional` **allowUpscale**: `boolean`

#### Defined in

packages/core/dist/types.d.ts:9

***

### aspect?

> `optional` **aspect**: `number`

#### Defined in

packages/core/dist/types.d.ts:10

***

### background?

> `optional` **background**: `number` \| `object`

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

`Metadata.background`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1102

***

### backgroundDirective?

> `optional` **backgroundDirective**: `string`

#### Defined in

packages/core/dist/types.d.ts:11

***

### blur?

> `optional` **blur**: `number` \| `boolean`

#### Defined in

packages/core/dist/types.d.ts:12

***

### brightness?

> `optional` **brightness**: `number` \| `""`

#### Defined in

packages/core/dist/types.d.ts:13

***

### channels?

> `optional` **channels**: `Channels`

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

`Metadata.channels`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1066

***

### chromaSubsampling

> **chromaSubsampling**: `string`

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

`Metadata.chromaSubsampling`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1072

***

### compression?

> `optional` **compression**: `"av1"` \| `"hevc"`

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

`Metadata.compression`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1100

***

### delay?

> `optional` **delay**: `number`[]

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

`Metadata.delay`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1082

***

### density?

> `optional` **density**: `number`

Number of pixels per inch (DPI), if present

#### Inherited from

`Metadata.density`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1070

***

### depth?

> `optional` **depth**: `string`

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

`Metadata.depth`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1068

***

### exif?

> `optional` **exif**: `Buffer`

Buffer containing raw EXIF data, if present

#### Inherited from

`Metadata.exif`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1090

***

### fit?

> `optional` **fit**: `string`

#### Defined in

packages/core/dist/types.d.ts:14

***

### flatten?

> `optional` **flatten**: `true`

#### Defined in

packages/core/dist/types.d.ts:17

***

### flip?

> `optional` **flip**: `true`

#### Defined in

packages/core/dist/types.d.ts:15

***

### flop?

> `optional` **flop**: `true`

#### Defined in

packages/core/dist/types.d.ts:16

***

### format?

> `optional` **format**: keyof FormatEnum

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

`Metadata.format`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1056

***

### formatMagick?

> `optional` **formatMagick**: `string`

String containing format for images loaded via *magick

#### Inherited from

`Metadata.formatMagick`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1110

***

### grayscale?

> `optional` **grayscale**: `true`

#### Defined in

packages/core/dist/types.d.ts:20

***

### hasAlpha?

> `optional` **hasAlpha**: `boolean`

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

`Metadata.hasAlpha`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1088

***

### hasProfile?

> `optional` **hasProfile**: `boolean`

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

`Metadata.hasProfile`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1086

***

### height?

> `optional` **height**: `number`

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

`Metadata.height`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1062

***

### hue?

> `optional` **hue**: `number` \| `""`

#### Defined in

packages/core/dist/types.d.ts:18

***

### icc?

> `optional` **icc**: `Buffer`

Buffer containing raw ICC profile data, if present

#### Inherited from

`Metadata.icc`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1092

***

### invert?

> `optional` **invert**: `true`

#### Defined in

packages/core/dist/types.d.ts:19

***

### iptc?

> `optional` **iptc**: `Buffer`

Buffer containing raw IPTC data, if present

#### Inherited from

`Metadata.iptc`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1094

***

### isProgressive?

> `optional` **isProgressive**: `boolean`

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

`Metadata.isProgressive`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1074

***

### kernel?

> `optional` **kernel**: `"nearest"` \| `"cubic"` \| `"mitchell"` \| `"lanczos2"` \| `"lanczos3"`

#### Defined in

packages/core/dist/types.d.ts:21

***

### levels?

> `optional` **levels**: `LevelMetadata`[]

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

`Metadata.levels`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1104

***

### loop?

> `optional` **loop**: `number`

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

`Metadata.loop`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1080

***

### lossless?

> `optional` **lossless**: `true`

#### Defined in

packages/core/dist/types.d.ts:22

***

### median?

> `optional` **median**: `number`

#### Defined in

packages/core/dist/types.d.ts:23

***

### normalize?

> `optional` **normalize**: `true`

#### Defined in

packages/core/dist/types.d.ts:24

***

### orientation?

> `optional` **orientation**: `number`

Number value of the EXIF Orientation header, if present

#### Inherited from

`Metadata.orientation`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1054

***

### pageHeight?

> `optional` **pageHeight**: `number`

Number of pixels high each page in a multi-page image will be.

#### Inherited from

`Metadata.pageHeight`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1078

***

### pagePrimary?

> `optional` **pagePrimary**: `number`

Number of the primary page in a HEIF image

#### Inherited from

`Metadata.pagePrimary`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1084

***

### pages?

> `optional` **pages**: `number`

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

`Metadata.pages`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1076

***

### pixelDensityDescriptor?

> `optional` **pixelDensityDescriptor**: `string`

#### Defined in

packages/core/dist/types.d.ts:25

***

### position?

> `optional` **position**: `"top"` \| `"right top"` \| `"right"` \| `"right bottom"` \| `"bottom"` \| `"left bottom"` \| `"left"` \| `"left top"` \| `"north"` \| `"northeast"` \| `"east"` \| `"southeast"` \| `"south"` \| `"southwest"` \| `"west"` \| `"northwest"` \| `"center"` \| `"centre"` \| `"entropy"` \| `"attention"`

#### Defined in

packages/core/dist/types.d.ts:26

***

### progressive?

> `optional` **progressive**: `true`

#### Defined in

packages/core/dist/types.d.ts:27

***

### quality?

> `optional` **quality**: `number`

#### Defined in

packages/core/dist/types.d.ts:28

***

### resolutionUnit?

> `optional` **resolutionUnit**: `"inch"` \| `"cm"`

The unit of resolution (density)

#### Inherited from

`Metadata.resolutionUnit`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1108

***

### rotate?

> `optional` **rotate**: `number`

#### Defined in

packages/core/dist/types.d.ts:31

***

### saturation?

> `optional` **saturation**: `number` \| `""`

#### Defined in

packages/core/dist/types.d.ts:29

***

### size?

> `optional` **size**: `number`

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

`Metadata.size`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1058

***

### space?

> `optional` **space**: keyof ColourspaceEnum

Name of colour space interpretation

#### Inherited from

`Metadata.space`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1064

***

### subifds?

> `optional` **subifds**: `number`

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

`Metadata.subifds`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1106

***

### tifftagPhotoshop?

> `optional` **tifftagPhotoshop**: `Buffer`

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

`Metadata.tifftagPhotoshop`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1098

***

### tint?

> `optional` **tint**: `string`

#### Defined in

packages/core/dist/types.d.ts:30

***

### width?

> `optional` **width**: `number`

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

`Metadata.width`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1060

***

### xmp?

> `optional` **xmp**: `Buffer`

Buffer containing raw XMP data, if present

#### Inherited from

`Metadata.xmp`

#### Defined in

node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1096
