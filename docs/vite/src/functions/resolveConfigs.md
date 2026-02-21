[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [vite/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): `ImageConfig`[]

Defined in: packages/core/dist/lib/resolve-configs.d.ts:8

This function builds up all possible combinations the given entries can be combined
and returns it as an array of objects that can be given to a the transforms.

## Parameters

### entries

\[`string`, `string`[]\][]

The url parameter entries

### outputFormats

`Record`\<`string`, [`OutputFormat`](../type-aliases/OutputFormat.md)\>

## Returns

`ImageConfig`[]

An array of directive options
