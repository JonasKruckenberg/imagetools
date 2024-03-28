[imagetools](../README.md) / [Modules](../modules.md) / [vite/src/types](../modules/vite_src_types.md) / CacheOptions

# Interface: CacheOptions

[vite/src/types](../modules/vite_src_types.md).CacheOptions

## Table of contents

### Properties

- [enabled](vite_src_types.CacheOptions.md#enabled)
- [dir](vite_src_types.CacheOptions.md#dir)
- [retention](vite_src_types.CacheOptions.md#retention)

## Properties

### enabled

• **enabled**: `boolean`

Wether caching of transformed images is enabled.

**`Default`**

```ts
true
```

#### Defined in

[packages/vite/src/types.ts:104](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L104)

### dir

• **dir**: `string`

Where to store generated images on disk as cache.

**`Default`**

```ts
'./node_modules/.cache/imagetools'
```

#### Defined in

[packages/vite/src/types.ts:109](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L109)

### retention

• **retention**: `number`

After what time an unused image will be removed from the cache.

**`Default`**

```ts
undefined
```

#### Defined in

[packages/vite/src/types.ts:114](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/types.ts#L114)
