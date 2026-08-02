[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): `ImageConfig`[]

Defined in: [packages/core/src/lib/resolve-configs.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/core/src/lib/resolve-configs.ts#L17)

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
