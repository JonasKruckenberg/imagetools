[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / TransformOption

# Type Alias: TransformOption()\<A, T\>

> **TransformOption**\<`A`, `T`\> = (`metadata`, `state`) => `T` \| `undefined`

Defined in: core/dist/types.d.ts:95

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
