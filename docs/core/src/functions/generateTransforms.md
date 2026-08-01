[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / generateTransforms

# Function: generateTransforms()

> **generateTransforms**(`config`, `factories`, `manualSearchParams`, `logger?`): `object`

Defined in: [core/src/lib/generate-transforms.ts:4](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/generate-transforms.ts#L4)

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
