[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / TransformFactory

# Type Alias: TransformFactory()\<A\>

> **TransformFactory**\<`A`\> = (`metadata`, `ctx`) => [`ImageTransformation`](ImageTransformation.md) \| `undefined`

Defined in: core/dist/types.d.ts:90

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
