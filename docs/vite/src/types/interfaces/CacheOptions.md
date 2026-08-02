[**imagetools**](../../../../README.md)

***

[imagetools](../../../../modules.md) / [vite/src/types](../README.md) / CacheOptions

# Interface: CacheOptions

Defined in: [packages/vite/src/types.ts:100](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/vite/src/types.ts#L100)

## Properties

### dir?

> `optional` **dir**: `string`

Defined in: [packages/vite/src/types.ts:109](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/vite/src/types.ts#L109)

Where should the cached images be stored. Default is './node_modules/.cache/imagetools'

***

### enabled?

> `optional` **enabled**: `boolean`

Defined in: [packages/vite/src/types.ts:104](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/vite/src/types.ts#L104)

Should the image cache be enabled. Default is true

***

### retention?

> `optional` **retention**: `number`

Defined in: [packages/vite/src/types.ts:114](https://github.com/JonasKruckenberg/imagetools/blob/aa84664d044e4b733cdf7005c6730584bc92ec90/packages/vite/src/types.ts#L114)

For how many seconds to keep transformed images cached. Default is undefined, which keeps the images forever.
