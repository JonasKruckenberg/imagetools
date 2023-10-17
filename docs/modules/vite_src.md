[imagetools](../README.md) / [Modules](../modules.md) / vite/src

# Module: vite/src

## Table of contents

### References

- [DefaultDirectives](vite_src.md#defaultdirectives)
- [Exclude](vite_src.md#exclude)
- [ExtendOutputFormats](vite_src.md#extendoutputformats)
- [ExtendTransforms](vite_src.md#extendtransforms)
- [Include](vite_src.md#include)
- [ResolveConfigs](vite_src.md#resolveconfigs)
- [VitePluginOptions](vite_src.md#vitepluginoptions)
- [resolveConfigs](vite_src.md#resolveconfigs-1)

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
- [ImageMetadata](../interfaces/vite_src.ImageMetadata.md)
- [Img](../interfaces/vite_src.Img.md)
- [InvertOptions](../interfaces/vite_src.InvertOptions.md)
- [KernelOptions](../interfaces/vite_src.KernelOptions.md)
- [Logger](../interfaces/vite_src.Logger.md)
- [LosslessOptions](../interfaces/vite_src.LosslessOptions.md)
- [MedianOptions](../interfaces/vite_src.MedianOptions.md)
- [NormalizeOptions](../interfaces/vite_src.NormalizeOptions.md)
- [Picture](../interfaces/vite_src.Picture.md)
- [PositionOptions](../interfaces/vite_src.PositionOptions.md)
- [ProcessedImageMetadata](../interfaces/vite_src.ProcessedImageMetadata.md)
- [ProgressiveOptions](../interfaces/vite_src.ProgressiveOptions.md)
- [QualityOptions](../interfaces/vite_src.QualityOptions.md)
- [ResizeOptions](../interfaces/vite_src.ResizeOptions.md)
- [RotateOptions](../interfaces/vite_src.RotateOptions.md)
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
- [getLossless](vite_src.md#getlossless)
- [getMetadata](vite_src.md#getmetadata)
- [getPosition](vite_src.md#getposition)
- [getProgressive](vite_src.md#getprogressive)
- [getQuality](vite_src.md#getquality)
- [grayscale](vite_src.md#grayscale)
- [hsb](vite_src.md#hsb)
- [imagetools](vite_src.md#imagetools)
- [imgFormat](vite_src.md#imgformat)
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
- [srcsetFormat](vite_src.md#srcsetformat)
- [tint](vite_src.md#tint)
- [urlFormat](vite_src.md#urlformat)

## References

### DefaultDirectives

Re-exports [DefaultDirectives](vite_src_types.md#defaultdirectives)

___

### Exclude

Re-exports [Exclude](vite_src_types.md#exclude)

___

### ExtendOutputFormats

Re-exports [ExtendOutputFormats](vite_src_types.md#extendoutputformats)

___

### ExtendTransforms

Re-exports [ExtendTransforms](vite_src_types.md#extendtransforms)

___

### Include

Re-exports [Include](vite_src_types.md#include)

___

### ResolveConfigs

Re-exports [ResolveConfigs](vite_src_types.md#resolveconfigs)

___

### VitePluginOptions

Re-exports [VitePluginOptions](../interfaces/vite_src_types.VitePluginOptions.md)

___

### resolveConfigs

Renames and re-exports [__type](../interfaces/vite_src_types.VitePluginOptions.md#__type)

## Type Aliases

### FitValue

Ƭ **FitValue**: typeof [`fitValues`](vite_src.md#fitvalues)[`number`]

#### Defined in

packages/core/dist/transforms/fit.d.ts:3

___

### FormatValue

Ƭ **FormatValue**: typeof [`formatValues`](vite_src.md#formatvalues)[`number`]

#### Defined in

packages/core/dist/transforms/format.d.ts:3

___

### ImageConfig

Ƭ **ImageConfig**: `Record`<`string`, `string` \| `string`[]\>

#### Defined in

packages/core/dist/types.d.ts:34

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

packages/core/dist/types.d.ts:47

___

### KernelValue

Ƭ **KernelValue**: typeof [`kernelValues`](vite_src.md#kernelvalues)[`number`]

#### Defined in

packages/core/dist/transforms/kernel.d.ts:3

___

### OutputFormat

Ƭ **OutputFormat**: (`args?`: `string`[]) => (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

#### Type declaration

▸ (`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55

___

### PositionValue

Ƭ **PositionValue**: typeof [`positionValues`](vite_src.md#positionvalues)[`number`]

#### Defined in

packages/core/dist/transforms/position.d.ts:4

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:46

## Variables

### builtinOutputFormats

• `Const` **builtinOutputFormats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `img` | [`OutputFormat`](vite_src.md#outputformat) |
| `meta` | [`OutputFormat`](vite_src.md#outputformat) |
| `metadata` | [`OutputFormat`](vite_src.md#outputformat) |
| `picture` | [`OutputFormat`](vite_src.md#outputformat) |
| `srcset` | [`OutputFormat`](vite_src.md#outputformat) |
| `url` | [`OutputFormat`](vite_src.md#outputformat) |

#### Defined in

packages/core/dist/output-formats.d.ts:8

___

### builtins

• `Const` **builtins**: (`TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory` \| `TransformFactory`)[]

#### Defined in

packages/core/dist/builtins.d.ts:1

___

### fitValues

• `Const` **fitValues**: readonly [``"cover"``, ``"contain"``, ``"fill"``, ``"inside"``, ``"outside"``]

#### Defined in

packages/core/dist/transforms/fit.d.ts:2

___

### formatValues

• `Const` **formatValues**: readonly [``"avif"``, ``"jpg"``, ``"jpeg"``, ``"png"``, ``"heif"``, ``"webp"``, ``"tiff"``]

#### Defined in

packages/core/dist/transforms/format.d.ts:2

___

### kernelValues

• `Const` **kernelValues**: readonly [``"nearest"``, ``"cubic"``, ``"mitchell"``, ``"lanczos2"``, ``"lanczos3"``]

#### Defined in

packages/core/dist/transforms/kernel.d.ts:2

___

### positionShorthands

• `Const` **positionShorthands**: `string`[]

#### Defined in

packages/core/dist/transforms/position.d.ts:3

___

### positionValues

• `Const` **positionValues**: readonly [``"top"``, ``"right top"``, ``"right"``, ``"right bottom"``, ``"bottom"``, ``"left bottom"``, ``"left"``, ``"left top"``, ``"north"``, ``"northeast"``, ``"east"``, ``"southeast"``, ``"south"``, ``"southwest"``, ``"west"``, ``"northwest"``, ``"center"``, ``"centre"``, ``"entropy"``, ``"attention"``]

#### Defined in

packages/core/dist/transforms/position.d.ts:2

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

packages/core/dist/lib/apply-transforms.d.ts:3

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/lib/parse-url.d.ts:2

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/util.d.ts:4

___

### generateTransforms

▸ **generateTransforms**(`config`, `factories`, `manualSearchParams`, `logger?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ImageConfig`](vite_src.md#imageconfig) |
| `factories` | [`TransformFactory`](vite_src.md#transformfactory)[] |
| `manualSearchParams` | `URLSearchParams` |
| `logger?` | [`Logger`](../interfaces/vite_src.Logger.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `parametersUsed` | `Set`<`string`\> |
| `transforms` | [`ImageTransformation`](vite_src.md#imagetransformation)[] |

#### Defined in

packages/core/dist/lib/generate-transforms.d.ts:2

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

packages/core/dist/types.d.ts:46

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

packages/core/dist/types.d.ts:46

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

packages/core/dist/types.d.ts:46

___

### getLossless

▸ **getLossless**(`metadata`, `image`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](vite_src.md#imageconfig) & [`LosslessOptions`](../interfaces/vite_src.LosslessOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:46

___

### getMetadata

▸ **getMetadata**(`image`, `key`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |
| `key` | `string` |

#### Returns

`unknown`

#### Defined in

packages/core/dist/lib/metadata.d.ts:10

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

packages/core/dist/types.d.ts:46

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

packages/core/dist/types.d.ts:46

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

packages/core/dist/types.d.ts:46

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:45

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

[packages/vite/src/index.ts:42](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/vite/src/index.ts#L42)

___

### imgFormat

▸ **imgFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/util.d.ts:3

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

packages/core/dist/types.d.ts:45

___

### metadataFormat

▸ **metadataFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/lib/parse-url.d.ts:1

___

### pictureFormat

▸ **pictureFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55

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

packages/core/dist/types.d.ts:45

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

packages/core/dist/types.d.ts:45

___

### setMetadata

▸ **setMetadata**(`image`, `key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`void`

#### Defined in

packages/core/dist/lib/metadata.d.ts:9

___

### srcsetFormat

▸ **srcsetFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55

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

packages/core/dist/types.d.ts:45

___

### urlFormat

▸ **urlFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/vite_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

packages/core/dist/types.d.ts:55
