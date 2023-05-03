[imagetools](../README.md) / [Modules](../modules.md) / vite/src

# Module: vite/src

## Table of contents

### References

- [resolveConfigs](vite_src.md#resolveconfigs)

### Interfaces

- [BackgroundOptions](../interfaces/vite_src.BackgroundOptions.md)
- [BlurOptions](../interfaces/vite_src.BlurOptions.md)
- [FitOptions](../interfaces/vite_src.FitOptions.md)
- [FlattenOptions](../interfaces/vite_src.FlattenOptions.md)
- [FlipOptions](../interfaces/vite_src.FlipOptions.md)
- [FlopOptions](../interfaces/vite_src.FlopOptions.md)
- [FormatOptions](../interfaces/vite_src.FormatOptions.md)
- [GrayscaleOptions](../interfaces/vite_src.GrayscaleOptions.md)
- [HSBOptions](../interfaces/vite_src.HSBOptions.md)
- [InvertOptions](../interfaces/vite_src.InvertOptions.md)
- [KernelOptions](../interfaces/vite_src.KernelOptions.md)
- [Logger](../interfaces/vite_src.Logger.md)
- [MedianOptions](../interfaces/vite_src.MedianOptions.md)
- [NormalizeOptions](../interfaces/vite_src.NormalizeOptions.md)
- [Picture](../interfaces/vite_src.Picture.md)
- [PositionOptions](../interfaces/vite_src.PositionOptions.md)
- [ProgressiveOptions](../interfaces/vite_src.ProgressiveOptions.md)
- [QualityOptions](../interfaces/vite_src.QualityOptions.md)
- [ResizeOptions](../interfaces/vite_src.ResizeOptions.md)
- [RotateOptions](../interfaces/vite_src.RotateOptions.md)
- [Source](../interfaces/vite_src.Source.md)
- [TintOptions](../interfaces/vite_src.TintOptions.md)
- [TransformFactoryContext](../interfaces/vite_src.TransformFactoryContext.md)
- [TransformResult](../interfaces/vite_src.TransformResult.md)

### Type Aliases

- [FitValue](vite_src.md#fitvalue)
- [FormatValue](vite_src.md#formatvalue)
- [ImageConfig](vite_src.md#imageconfig)
- [ImageTransformation](vite_src.md#imagetransformation)
- [KernelValue](vite_src.md#kernelvalue)
- [OutputFormat](vite_src.md#outputformat)
- [PositionValue](vite_src.md#positionvalue)
- [TransformFactory](vite_src.md#transformfactory)
- [TransformOption](vite_src.md#transformoption)

### Variables

- [builtinOutputFormats](vite_src.md#builtinoutputformats)
- [builtins](vite_src.md#builtins)
- [fitValues](vite_src.md#fitvalues)
- [formatValues](vite_src.md#formatvalues)
- [kernelValues](vite_src.md#kernelvalues)
- [positionShorthands](vite_src.md#positionshorthands)
- [positionValues](vite_src.md#positionvalues)

### Functions

- [applyTransforms](vite_src.md#applytransforms)
- [blur](vite_src.md#blur)
- [extractEntries](vite_src.md#extractentries)
- [flatten](vite_src.md#flatten)
- [flip](vite_src.md#flip)
- [flop](vite_src.md#flop)
- [format](vite_src.md#format)
- [generateImageID](vite_src.md#generateimageid)
- [generateTransforms](vite_src.md#generatetransforms)
- [getBackground](vite_src.md#getbackground)
- [getFit](vite_src.md#getfit)
- [getKernel](vite_src.md#getkernel)
- [getMetadata](vite_src.md#getmetadata)
- [getPosition](vite_src.md#getposition)
- [getProgressive](vite_src.md#getprogressive)
- [getQuality](vite_src.md#getquality)
- [grayscale](vite_src.md#grayscale)
- [hsb](vite_src.md#hsb)
- [imagetools](vite_src.md#imagetools)
- [invert](vite_src.md#invert)
- [loadImage](vite_src.md#loadimage)
- [median](vite_src.md#median)
- [metadataFormat](vite_src.md#metadataformat)
- [normalize](vite_src.md#normalize)
- [parseURL](vite_src.md#parseurl)
- [pictureFormat](vite_src.md#pictureformat)
- [resize](vite_src.md#resize)
- [rotate](vite_src.md#rotate)
- [setMetadata](vite_src.md#setmetadata)
- [sourceFormat](vite_src.md#sourceformat)
- [srcsetFormat](vite_src.md#srcsetformat)
- [tint](vite_src.md#tint)
- [urlFormat](vite_src.md#urlformat)

## References

### resolveConfigs

Renames and re-exports [__type](../interfaces/vite_src_types.VitePluginOptions.md#__type)

## Type Aliases

### FitValue

Ƭ **FitValue**: typeof [`fitValues`](vite_src.md#fitvalues)[`number`]

#### Defined in

core/dist/transforms/fit.d.ts:3

___

### FormatValue

Ƭ **FormatValue**: typeof [`formatValues`](vite_src.md#formatvalues)[`number`]

#### Defined in

core/dist/transforms/format.d.ts:3

___

### ImageConfig

Ƭ **ImageConfig**: `Record`<`string`, `unknown`\>

#### Defined in

core/dist/types.d.ts:2

___

### ImageTransformation

Ƭ **ImageTransformation**: (`image`: `Sharp`) => `Sharp` \| `Promise`<`Sharp`\>

#### Type declaration

▸ (`image`): `Sharp` \| `Promise`<`Sharp`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |

##### Returns

`Sharp` \| `Promise`<`Sharp`\>

#### Defined in

core/dist/types.d.ts:14

___

### KernelValue

Ƭ **KernelValue**: typeof [`kernelValues`](vite_src.md#kernelvalues)[`number`]

#### Defined in

core/dist/transforms/kernel.d.ts:3

___

### OutputFormat

Ƭ **OutputFormat**: (`args?`: `string`[]) => (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

#### Type declaration

▸ (`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

The JS object returned by the image import.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

##### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22

___

### PositionValue

Ƭ **PositionValue**: typeof [`positionValues`](vite_src.md#positionvalues)[`number`]

#### Defined in

core/dist/transforms/position.d.ts:4

___

### TransformFactory

Ƭ **TransformFactory**<`A`\>: (`metadata`: `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & `A`\>, `ctx`: [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md)) => [`ImageTransformation`](vite_src.md#imagetransformation) \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `Record`<`string`, `unknown`\> |

#### Type declaration

▸ (`metadata`, `ctx`): [`ImageTransformation`](vite_src.md#imagetransformation) \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & `A`\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

##### Returns

[`ImageTransformation`](vite_src.md#imagetransformation) \| `undefined`

#### Defined in

core/dist/types.d.ts:12

___

### TransformOption

Ƭ **TransformOption**<`A`, `T`\>: (`metadata`: `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & `A`\>, `image`: `Sharp`) => `T` \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `Record`<`string`, `unknown`\> |
| `T` | `unknown` |

#### Type declaration

▸ (`metadata`, `image`): `T` \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & `A`\> |
| `image` | `Sharp` |

##### Returns

`T` \| `undefined`

#### Defined in

core/dist/types.d.ts:13

## Variables

### builtinOutputFormats

• `Const` **builtinOutputFormats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta` | [`OutputFormat`](vite_src.md#outputformat) |
| `metadata` | [`OutputFormat`](vite_src.md#outputformat) |
| `picture` | [`OutputFormat`](vite_src.md#outputformat) |
| `source` | [`OutputFormat`](vite_src.md#outputformat) |
| `srcset` | [`OutputFormat`](vite_src.md#outputformat) |
| `url` | [`OutputFormat`](vite_src.md#outputformat) |

#### Defined in

core/dist/output-formats.d.ts:8

___

### builtins

• `Const` **builtins**: (`TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory`)[]

#### Defined in

core/dist/builtins.d.ts:1

___

### fitValues

• `Const` **fitValues**: readonly [``"cover"``, ``"contain"``, ``"fill"``, ``"inside"``, ``"outside"``]

#### Defined in

core/dist/transforms/fit.d.ts:2

___

### formatValues

• `Const` **formatValues**: readonly [``"avif"``, ``"jpg"``, ``"jpeg"``, ``"png"``, ``"heif"``, ``"heic"``, ``"webp"``, ``"tiff"``]

#### Defined in

core/dist/transforms/format.d.ts:2

___

### kernelValues

• `Const` **kernelValues**: readonly [``"nearest"``, ``"cubic"``, ``"mitchell"``, ``"lanczos2"``, ``"lanczos3"``]

#### Defined in

core/dist/transforms/kernel.d.ts:2

___

### positionShorthands

• `Const` **positionShorthands**: `string`[]

#### Defined in

core/dist/transforms/position.d.ts:3

___

### positionValues

• `Const` **positionValues**: readonly [``"top"``, ``"right top"``, ``"right"``, ``"right bottom"``, ``"bottom"``, ``"left bottom"``, ``"left"``, ``"left top"``, ``"north"``, ``"northeast"``, ``"east"``, ``"southeast"``, ``"south"``, ``"southwest"``, ``"west"``, ``"northwest"``, ``"center"``, ``"centre"``, ``"entropy"``, ``"attention"``]

#### Defined in

core/dist/transforms/position.d.ts:2

## Functions

### applyTransforms

▸ **applyTransforms**(`transforms`, `image`, `removeMetadata?`): `Promise`<[`TransformResult`](../interfaces/vite_src.TransformResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transforms` | [`ImageTransformation`](vite_src.md#imagetransformation)[] |
| `image` | `Sharp` |
| `removeMetadata?` | `boolean` |

#### Returns

`Promise`<[`TransformResult`](../interfaces/vite_src.TransformResult.md)\>

#### Defined in

core/dist/lib/apply-transforms.d.ts:3

___

### blur

▸ **blur**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`BlurOptions`](../interfaces/vite_src.BlurOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### extractEntries

▸ **extractEntries**(`searchParams`): [`string`, `string`[]][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchParams` | `URLSearchParams` |

#### Returns

[`string`, `string`[]][]

#### Defined in

core/dist/lib/parse-url.d.ts:2

___

### flatten

▸ **flatten**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`FlattenOptions`](../interfaces/vite_src.FlattenOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### flip

▸ **flip**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`FlipOptions`](../interfaces/vite_src.FlipOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### flop

▸ **flop**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`FlopOptions`](../interfaces/vite_src.FlopOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### format

▸ **format**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`FormatOptions`](../interfaces/vite_src.FormatOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### generateImageID

▸ **generateImageID**(`url`, `config`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `URL` |
| `config` | [`ImageConfig`](vite_src.md#imageconfig) |

#### Returns

`string`

#### Defined in

core/dist/util.d.ts:4

___

### generateTransforms

▸ **generateTransforms**(`config`, `factories`, `logger?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ImageConfig`](vite_src.md#imageconfig) |
| `factories` | [`TransformFactory`](vite_src.md#transformfactory)[] |
| `logger?` | [`Logger`](../interfaces/vite_src.Logger.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `parametersUsed` | `Set`<`string`\> |
| `transforms` | [`ImageTransformation`](vite_src.md#imagetransformation)[] |

#### Defined in

core/dist/lib/generate-transforms.d.ts:2

___

### getBackground

▸ **getBackground**(`metadata`, `image`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`BackgroundOptions`](../interfaces/vite_src.BackgroundOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| `string`

#### Defined in

core/dist/types.d.ts:13

___

### getFit

▸ **getFit**(`metadata`, `image`): `undefined` \| ``"cover"`` \| ``"contain"`` \| ``"fill"`` \| ``"inside"`` \| ``"outside"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`FitOptions`](../interfaces/vite_src.FitOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"cover"`` \| ``"contain"`` \| ``"fill"`` \| ``"inside"`` \| ``"outside"``

#### Defined in

core/dist/types.d.ts:13

___

### getKernel

▸ **getKernel**(`metadata`, `image`): `undefined` \| ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`KernelOptions`](../interfaces/vite_src.KernelOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Defined in

core/dist/types.d.ts:13

___

### getMetadata

▸ **getMetadata**(`image`, `key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |
| `key` | `string` |

#### Returns

`any`

#### Defined in

core/dist/lib/metadata.d.ts:9

___

### getPosition

▸ **getPosition**(`metadata`, `image`): `undefined` \| ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`PositionOptions`](../interfaces/vite_src.PositionOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Defined in

core/dist/types.d.ts:13

___

### getProgressive

▸ **getProgressive**(`metadata`, `image`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`ProgressiveOptions`](../interfaces/vite_src.ProgressiveOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:13

___

### getQuality

▸ **getQuality**(`metadata`, `image`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`QualityOptions`](../interfaces/vite_src.QualityOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| `number`

#### Defined in

core/dist/types.d.ts:13

___

### grayscale

▸ **grayscale**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`GrayscaleOptions`](../interfaces/vite_src.GrayscaleOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### hsb

▸ **hsb**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`HSBOptions`](../interfaces/vite_src.HSBOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### imagetools

▸ **imagetools**(`userOptions?`): `Plugin`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOptions` | `Partial`<[`VitePluginOptions`](../interfaces/vite_src_types.VitePluginOptions.md)\> |

#### Returns

`Plugin`

#### Defined in

[vite/src/index.ts:29](https://github.com/JonasKruckenberg/imagetools/blob/0016446/packages/vite/src/index.ts#L29)

___

### invert

▸ **invert**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`InvertOptions`](../interfaces/vite_src.InvertOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### loadImage

▸ **loadImage**(`path`): `sharp.Sharp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`sharp.Sharp`

#### Defined in

core/dist/util.d.ts:3

___

### median

▸ **median**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`MedianOptions`](../interfaces/vite_src.MedianOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### metadataFormat

▸ **metadataFormat**(`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

The JS object returned by the image import.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22

___

### normalize

▸ **normalize**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`NormalizeOptions`](../interfaces/vite_src.NormalizeOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### parseURL

▸ **parseURL**(`rawURL`): `URL`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawURL` | `string` |

#### Returns

`URL`

#### Defined in

core/dist/lib/parse-url.d.ts:1

___

### pictureFormat

▸ **pictureFormat**(`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

fallback format should be specified last

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22

___

### resize

▸ **resize**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`ResizeOptions`](../interfaces/vite_src.ResizeOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### rotate

▸ **rotate**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`RotateOptions`](../interfaces/vite_src.RotateOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### setMetadata

▸ **setMetadata**(`image`, `key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

core/dist/lib/metadata.d.ts:8

___

### sourceFormat

▸ **sourceFormat**(`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

The JS object returned by the image import.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22

___

### srcsetFormat

▸ **srcsetFormat**(`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

The JS object returned by the image import.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22

___

### tint

▸ **tint**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`TintOptions`](../interfaces/vite_src.TintOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/vite_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](vite_src.md#imagetransformation)

#### Defined in

core/dist/types.d.ts:12

___

### urlFormat

▸ **urlFormat**(`args?`): (`metadata`: [`ImageConfig`](vite_src.md#imageconfig)[]) => `unknown`

The JS object returned by the image import.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`fn`

▸ (`metadata`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`ImageConfig`](vite_src.md#imageconfig)[] |

##### Returns

`unknown`

#### Defined in

core/dist/types.d.ts:22
