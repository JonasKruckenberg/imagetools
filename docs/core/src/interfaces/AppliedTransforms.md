[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / AppliedTransforms

# Interface: AppliedTransforms

Defined in: [core/src/types.ts:22](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L22)

The values applied by each transform during the pipeline run, mirroring the
options available as image query parameters. Only the transforms that were
applied record a value.

## Properties

### allowUpscale?

> `optional` **allowUpscale**: `boolean`

Defined in: [core/src/types.ts:24](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L24)

***

### aspect?

> `optional` **aspect**: `number`

Defined in: [core/src/types.ts:25](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L25)

***

### backgroundDirective?

> `optional` **backgroundDirective**: `string`

Defined in: [core/src/types.ts:26](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L26)

***

### blur?

> `optional` **blur**: `number` \| `boolean`

Defined in: [core/src/types.ts:27](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L27)

***

### brightness?

> `optional` **brightness**: `number` \| `""`

Defined in: [core/src/types.ts:28](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L28)

***

### effort?

> `optional` **effort**: `number`

Defined in: [core/src/types.ts:46](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L46)

***

### fit?

> `optional` **fit**: `string`

Defined in: [core/src/types.ts:29](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L29)

***

### flatten?

> `optional` **flatten**: `true`

Defined in: [core/src/types.ts:32](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L32)

***

### flip?

> `optional` **flip**: `true`

Defined in: [core/src/types.ts:30](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L30)

***

### flop?

> `optional` **flop**: `true`

Defined in: [core/src/types.ts:31](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L31)

***

### format?

> `optional` **format**: `string`

Defined in: [core/src/types.ts:23](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L23)

***

### grayscale?

> `optional` **grayscale**: `true`

Defined in: [core/src/types.ts:35](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L35)

***

### hue?

> `optional` **hue**: `number` \| `""`

Defined in: [core/src/types.ts:33](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L33)

***

### invert?

> `optional` **invert**: `true`

Defined in: [core/src/types.ts:34](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L34)

***

### kernel?

> `optional` **kernel**: `"nearest"` \| `"cubic"` \| `"mitchell"` \| `"lanczos2"` \| `"lanczos3"`

Defined in: [core/src/types.ts:36](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L36)

***

### lossless?

> `optional` **lossless**: `true`

Defined in: [core/src/types.ts:37](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L37)

***

### median?

> `optional` **median**: `number`

Defined in: [core/src/types.ts:38](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L38)

***

### normalize?

> `optional` **normalize**: `true`

Defined in: [core/src/types.ts:39](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L39)

***

### position?

> `optional` **position**: `"top"` \| `"right top"` \| `"right"` \| `"right bottom"` \| `"bottom"` \| `"left bottom"` \| `"left"` \| `"left top"` \| `"north"` \| `"northeast"` \| `"east"` \| `"southeast"` \| `"south"` \| `"southwest"` \| `"west"` \| `"northwest"` \| `"center"` \| `"centre"` \| `"entropy"` \| `"attention"`

Defined in: [core/src/types.ts:40](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L40)

***

### progressive?

> `optional` **progressive**: `true`

Defined in: [core/src/types.ts:41](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L41)

***

### quality?

> `optional` **quality**: `number`

Defined in: [core/src/types.ts:42](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L42)

***

### rotate?

> `optional` **rotate**: `number`

Defined in: [core/src/types.ts:45](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L45)

***

### saturation?

> `optional` **saturation**: `number` \| `""`

Defined in: [core/src/types.ts:43](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L43)

***

### tint?

> `optional` **tint**: `string`

Defined in: [core/src/types.ts:44](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L44)
