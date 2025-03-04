[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / ImageMetadata

# Interface: ImageMetadata

Defined in: [packages/core/src/types.ts:10](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L10)

## Extends

- `Metadata`

## Extended by

- [`ProcessedImageMetadata`](ProcessedImageMetadata.md)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### allowUpscale?

> `optional` **allowUpscale**: `boolean`

Defined in: [packages/core/src/types.ts:11](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L11)

***

### aspect?

> `optional` **aspect**: `number`

Defined in: [packages/core/src/types.ts:12](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L12)

***

### background?

> `optional` **background**: `number` \| \{ `b`: `number`; `g`: `number`; `r`: `number`; \}

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1102

Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value

#### Inherited from

`Metadata.background`

***

### backgroundDirective?

> `optional` **backgroundDirective**: `string`

Defined in: [packages/core/src/types.ts:13](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L13)

***

### blur?

> `optional` **blur**: `number` \| `boolean`

Defined in: [packages/core/src/types.ts:14](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L14)

***

### brightness?

> `optional` **brightness**: `number` \| `""`

Defined in: [packages/core/src/types.ts:15](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L15)

***

### channels?

> `optional` **channels**: `Channels`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1066

Number of bands e.g. 3 for sRGB, 4 for CMYK

#### Inherited from

`Metadata.channels`

***

### chromaSubsampling

> **chromaSubsampling**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1072

String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK

#### Inherited from

`Metadata.chromaSubsampling`

***

### compression?

> `optional` **compression**: `"av1"` \| `"hevc"`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1100

The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC)

#### Inherited from

`Metadata.compression`

***

### delay?

> `optional` **delay**: `number`[]

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1082

Delay in ms between each page in an animated image, provided as an array of integers.

#### Inherited from

`Metadata.delay`

***

### density?

> `optional` **density**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1070

Number of pixels per inch (DPI), if present

#### Inherited from

`Metadata.density`

***

### depth?

> `optional` **depth**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1068

Name of pixel depth format e.g. uchar, char, ushort, float ...

#### Inherited from

`Metadata.depth`

***

### exif?

> `optional` **exif**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1090

Buffer containing raw EXIF data, if present

#### Inherited from

`Metadata.exif`

***

### fit?

> `optional` **fit**: `string`

Defined in: [packages/core/src/types.ts:16](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L16)

***

### flatten?

> `optional` **flatten**: `true`

Defined in: [packages/core/src/types.ts:19](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L19)

***

### flip?

> `optional` **flip**: `true`

Defined in: [packages/core/src/types.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L17)

***

### flop?

> `optional` **flop**: `true`

Defined in: [packages/core/src/types.ts:18](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L18)

***

### format?

> `optional` **format**: keyof FormatEnum

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1056

Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg

#### Inherited from

`Metadata.format`

***

### formatMagick?

> `optional` **formatMagick**: `string`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1110

String containing format for images loaded via *magick

#### Inherited from

`Metadata.formatMagick`

***

### grayscale?

> `optional` **grayscale**: `true`

Defined in: [packages/core/src/types.ts:22](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L22)

***

### hasAlpha?

> `optional` **hasAlpha**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1088

Boolean indicating the presence of an alpha transparency channel

#### Inherited from

`Metadata.hasAlpha`

***

### hasProfile?

> `optional` **hasProfile**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1086

Boolean indicating the presence of an embedded ICC profile

#### Inherited from

`Metadata.hasProfile`

***

### height?

> `optional` **height**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1062

Number of pixels high (EXIF orientation is not taken into consideration)

#### Inherited from

`Metadata.height`

***

### hue?

> `optional` **hue**: `number` \| `""`

Defined in: [packages/core/src/types.ts:20](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L20)

***

### icc?

> `optional` **icc**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1092

Buffer containing raw ICC profile data, if present

#### Inherited from

`Metadata.icc`

***

### invert?

> `optional` **invert**: `true`

Defined in: [packages/core/src/types.ts:21](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L21)

***

### iptc?

> `optional` **iptc**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1094

Buffer containing raw IPTC data, if present

#### Inherited from

`Metadata.iptc`

***

### isProgressive?

> `optional` **isProgressive**: `boolean`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1074

Boolean indicating whether the image is interlaced using a progressive scan

#### Inherited from

`Metadata.isProgressive`

***

### kernel?

> `optional` **kernel**: `"nearest"` \| `"cubic"` \| `"mitchell"` \| `"lanczos2"` \| `"lanczos3"`

Defined in: [packages/core/src/types.ts:23](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L23)

***

### levels?

> `optional` **levels**: `LevelMetadata`[]

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1104

Details of each level in a multi-level image provided as an array of objects, requires libvips compiled with support for OpenSlide

#### Inherited from

`Metadata.levels`

***

### loop?

> `optional` **loop**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1080

Number of times to loop an animated image, zero refers to a continuous loop.

#### Inherited from

`Metadata.loop`

***

### lossless?

> `optional` **lossless**: `true`

Defined in: [packages/core/src/types.ts:24](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L24)

***

### median?

> `optional` **median**: `number`

Defined in: [packages/core/src/types.ts:25](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L25)

***

### normalize?

> `optional` **normalize**: `true`

Defined in: [packages/core/src/types.ts:26](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L26)

***

### orientation?

> `optional` **orientation**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1054

Number value of the EXIF Orientation header, if present

#### Inherited from

`Metadata.orientation`

***

### pageHeight?

> `optional` **pageHeight**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1078

Number of pixels high each page in a multi-page image will be.

#### Inherited from

`Metadata.pageHeight`

***

### pagePrimary?

> `optional` **pagePrimary**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1084

Number of the primary page in a HEIF image

#### Inherited from

`Metadata.pagePrimary`

***

### pages?

> `optional` **pages**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1076

Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP

#### Inherited from

`Metadata.pages`

***

### pixelDensityDescriptor?

> `optional` **pixelDensityDescriptor**: `string`

Defined in: [packages/core/src/types.ts:27](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L27)

***

### position?

> `optional` **position**: `"top"` \| `"right top"` \| `"right"` \| `"right bottom"` \| `"bottom"` \| `"left bottom"` \| `"left"` \| `"left top"` \| `"north"` \| `"northeast"` \| `"east"` \| `"southeast"` \| `"south"` \| `"southwest"` \| `"west"` \| `"northwest"` \| `"center"` \| `"centre"` \| `"entropy"` \| `"attention"`

Defined in: [packages/core/src/types.ts:28](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L28)

***

### progressive?

> `optional` **progressive**: `true`

Defined in: [packages/core/src/types.ts:29](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L29)

***

### quality?

> `optional` **quality**: `number`

Defined in: [packages/core/src/types.ts:30](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L30)

***

### resolutionUnit?

> `optional` **resolutionUnit**: `"inch"` \| `"cm"`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1108

The unit of resolution (density)

#### Inherited from

`Metadata.resolutionUnit`

***

### rotate?

> `optional` **rotate**: `number`

Defined in: [packages/core/src/types.ts:33](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L33)

***

### saturation?

> `optional` **saturation**: `number` \| `""`

Defined in: [packages/core/src/types.ts:31](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L31)

***

### size?

> `optional` **size**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1058

Total size of image in bytes, for Stream and Buffer input only

#### Inherited from

`Metadata.size`

***

### space?

> `optional` **space**: keyof ColourspaceEnum

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1064

Name of colour space interpretation

#### Inherited from

`Metadata.space`

***

### subifds?

> `optional` **subifds**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1106

Number of Sub Image File Directories in an OME-TIFF image

#### Inherited from

`Metadata.subifds`

***

### tifftagPhotoshop?

> `optional` **tifftagPhotoshop**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1098

Buffer containing raw TIFFTAG_PHOTOSHOP data, if present

#### Inherited from

`Metadata.tifftagPhotoshop`

***

### tint?

> `optional` **tint**: `string`

Defined in: [packages/core/src/types.ts:32](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L32)

***

### width?

> `optional` **width**: `number`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1060

Number of pixels wide (EXIF orientation is not taken into consideration)

#### Inherited from

`Metadata.width`

***

### xmp?

> `optional` **xmp**: `Buffer`

Defined in: node\_modules/.pnpm/sharp@0.33.4/node\_modules/sharp/lib/index.d.ts:1096

Buffer containing raw XMP data, if present

#### Inherited from

`Metadata.xmp`
