[**imagetools**](../../../README.md)

***

[imagetools](../../../modules.md) / [core/src](../README.md) / resolveConfigs

# Function: resolveConfigs()

> **resolveConfigs**(`entries`, `outputFormats`): `Record`\<`string`, `string` \| `string`[]\>[]

Defined in: [packages/core/src/lib/resolve-configs.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/87fff79acddac50a50f7aee7c6a68a0623fbc68f/packages/core/src/lib/resolve-configs.ts#L17)

This function builds up all possible combinations the given entries can be combined
and returns it as an array of objects that can be given to a the transforms.

## Parameters

### entries

\[`string`, `string`[]\][]

The url parameter entries

### outputFormats

`Record`\<`string`, [`OutputFormat`](../type-aliases/OutputFormat.md)\>

## Returns

`Record`\<`string`, `string` \| `string`[]\>[]

An array of directive options
