[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / TransformFactory

# Type Alias: TransformFactory()\<A\>

> **TransformFactory**\<`A`\>: (`metadata`, `ctx`) => [`ImageTransformation`](ImageTransformation.md) \| `undefined`

Defined in: [packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/types.ts#L51)

## Type Parameters

• **A** = `Record`\<`string`, `unknown`\>

## Parameters

### metadata

`Partial`\<[`ImageConfig`](ImageConfig.md) & `A`\>

### ctx

[`TransformFactoryContext`](../interfaces/TransformFactoryContext.md)

## Returns

[`ImageTransformation`](ImageTransformation.md) \| `undefined`
