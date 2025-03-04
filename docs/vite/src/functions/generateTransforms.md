[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / generateTransforms

# Function: generateTransforms()

> **generateTransforms**(`config`, `factories`, `manualSearchParams`, `logger`?): `object`

Defined in: packages/core/dist/lib/generate-transforms.d.ts:2

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
