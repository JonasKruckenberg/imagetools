[**imagetools**](../../../../README.md) • **Docs**

***

[imagetools](../../../../modules.md) / [vite/src/types](../README.md) / CacheOptions

# Interface: CacheOptions

## Properties

### dir?

> `optional` **dir**: `string`

Where should the cached images be stored. Default is './node_modules/.cache/imagetools'

#### Defined in

[packages/vite/src/types.ts:109](https://github.com/JonasKruckenberg/imagetools/blob/b6421598cd4879d5c28755c1d558f8b5955cc5a1/packages/vite/src/types.ts#L109)

***

### enabled?

> `optional` **enabled**: `boolean`

Should the image cache be enabled. Default is true

#### Defined in

[packages/vite/src/types.ts:104](https://github.com/JonasKruckenberg/imagetools/blob/b6421598cd4879d5c28755c1d558f8b5955cc5a1/packages/vite/src/types.ts#L104)

***

### retention?

> `optional` **retention**: `number`

For how many seconds to keep transformed images cached. Default is undefined, which keeps the images forever.

#### Defined in

[packages/vite/src/types.ts:114](https://github.com/JonasKruckenberg/imagetools/blob/b6421598cd4879d5c28755c1d558f8b5955cc5a1/packages/vite/src/types.ts#L114)
