[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / TransformFactory

# Type Alias: TransformFactory()\<A\>

> **TransformFactory**\<`A`\> = (`metadata`, `ctx`) => [`ImageTransformation`](ImageTransformation.md) \| `undefined`

Defined in: [core/src/types.ts:95](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/types.ts#L95)

Creates an `ImageTransformation` from the parsed directives, or returns
`undefined` to skip the transform for this run.

## Type Parameters

### A

`A` = `Record`\<`string`, `unknown`\>

## Parameters

### metadata

`Partial`\<[`ImageConfig`](ImageConfig.md) & `A`\>

### ctx

[`TransformFactoryContext`](../interfaces/TransformFactoryContext.md)

## Returns

[`ImageTransformation`](ImageTransformation.md) \| `undefined`
