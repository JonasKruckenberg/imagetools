[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / TransformOption

# Type Alias: TransformOption()\<A, T\>

> **TransformOption**\<`A`, `T`\> = (`metadata`, `state`) => `T` \| `undefined`

Defined in: [core/src/types.ts:104](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L104)

Reads a transform value from the parsed directives and the threaded state,
recording the applied value on `state.transforms` when present.

## Type Parameters

### A

`A` = `Record`\<`string`, `unknown`\>

### T

`T` = `unknown`

## Parameters

### metadata

`Partial`\<[`ImageConfig`](ImageConfig.md) & `A`\>

### state

[`ImageMetadata`](../interfaces/ImageMetadata.md)

## Returns

`T` \| `undefined`
