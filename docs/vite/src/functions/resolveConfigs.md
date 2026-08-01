[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): [`ImageConfig`](../type-aliases/ImageConfig.md)[]

Defined in: core/dist/lib/resolve-configs.d.ts:10

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
