[**imagetools**](../../../README.md) • **Docs**

***

[imagetools](../../../modules.md) / [core/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): `Record`\<`string`, `string` \| `string`[]\>[]

This function builds up all possible combinations the given entries can be combined
and returns it as an array of objects that can be given to a the transforms.

## Parameters

• **entries**: [`string`, `string`[]][]

The url parameter entries

• **outputFormats**: `Record`\<`string`, [`OutputFormat`](../type-aliases/OutputFormat.md)\>

## Returns

`Record`\<`string`, `string` \| `string`[]\>[]

An array of directive options

## Defined in

[packages/core/src/lib/resolve-configs.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/b6421598cd4879d5c28755c1d558f8b5955cc5a1/packages/core/src/lib/resolve-configs.ts#L17)
