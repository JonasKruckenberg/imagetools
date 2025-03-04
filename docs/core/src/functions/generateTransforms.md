[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / generateTransforms

# Function: generateTransforms()

> **generateTransforms**(`config`, `factories`, `manualSearchParams`, `logger`?): `object`

Defined in: [packages/core/src/lib/generate-transforms.ts:4](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/lib/generate-transforms.ts#L4)

## Parameters

### config

[`ImageConfig`](../type-aliases/ImageConfig.md)

### factories

[`TransformFactory`](../type-aliases/TransformFactory.md)[]

### manualSearchParams

`URLSearchParams`

### logger?

[`Logger`](../interfaces/Logger.md)

## Returns

`object`

### parametersUsed

> **parametersUsed**: `Set`\<`string`\>

### transforms

> **transforms**: [`ImageTransformation`](../type-aliases/ImageTransformation.md)[]
