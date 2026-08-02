[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / TransformFactory

# Type Alias: TransformFactory()\<A\>

> **TransformFactory**\<`A`\> = (`metadata`, `ctx`) => [`ImageTransformation`](ImageTransformation.md) \| `undefined`

Defined in: [packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/core/src/types.ts#L51)

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
