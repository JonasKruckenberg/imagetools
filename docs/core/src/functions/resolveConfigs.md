[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): [`ImageConfig`](../type-aliases/ImageConfig.md)[]

Defined in: [core/src/lib/resolve-configs.ts:17](https://github.com/blt-r/imagetools/blob/c792392eda68f17d70a8f7e2a2fdb3d0f2a118ee/packages/core/src/lib/resolve-configs.ts#L17)

Builds every combination the given URL entries can be combined into, as an
array of configs that can be passed to the transforms. Output format
parameters (e.g. `as=`) are appended to every combination instead of
contributing to the product.

## Parameters

### entries

\[`string`, `string`[]\][]

The URL parameter entries

### outputFormats

`Record`\<`string`, [`OutputFormat`](../type-aliases/OutputFormat.md)\>

## Returns

[`ImageConfig`](../type-aliases/ImageConfig.md)[]

An array of directive configs
