[imagetools](../README.md) / [Modules](../modules.md) / core/src

# Module: core/src

## Table of contents

### Interfaces

- [BackgroundOptions](../interfaces/core_src.BackgroundOptions.md)
- [BlurOptions](../interfaces/core_src.BlurOptions.md)
- [FitOptions](../interfaces/core_src.FitOptions.md)
- [FlattenOptions](../interfaces/core_src.FlattenOptions.md)
- [FlipOptions](../interfaces/core_src.FlipOptions.md)
- [FlopOptions](../interfaces/core_src.FlopOptions.md)
- [FormatOptions](../interfaces/core_src.FormatOptions.md)
- [GrayscaleOptions](../interfaces/core_src.GrayscaleOptions.md)
- [HSBOptions](../interfaces/core_src.HSBOptions.md)
- [ImageMetadata](../interfaces/core_src.ImageMetadata.md)
- [Img](../interfaces/core_src.Img.md)
- [InvertOptions](../interfaces/core_src.InvertOptions.md)
- [KernelOptions](../interfaces/core_src.KernelOptions.md)
- [Logger](../interfaces/core_src.Logger.md)
- [LosslessOptions](../interfaces/core_src.LosslessOptions.md)
- [MedianOptions](../interfaces/core_src.MedianOptions.md)
- [NormalizeOptions](../interfaces/core_src.NormalizeOptions.md)
- [Picture](../interfaces/core_src.Picture.md)
- [PositionOptions](../interfaces/core_src.PositionOptions.md)
- [ProcessedImageMetadata](../interfaces/core_src.ProcessedImageMetadata.md)
- [ProgressiveOptions](../interfaces/core_src.ProgressiveOptions.md)
- [QualityOptions](../interfaces/core_src.QualityOptions.md)
- [ResizeOptions](../interfaces/core_src.ResizeOptions.md)
- [RotateOptions](../interfaces/core_src.RotateOptions.md)
- [TintOptions](../interfaces/core_src.TintOptions.md)
- [TransformFactoryContext](../interfaces/core_src.TransformFactoryContext.md)
- [TransformResult](../interfaces/core_src.TransformResult.md)

### Type Aliases

- [FitValue](core_src.md#fitvalue)
- [FormatValue](core_src.md#formatvalue)
- [ImageConfig](core_src.md#imageconfig)
- [ImageTransformation](core_src.md#imagetransformation)
- [KernelValue](core_src.md#kernelvalue)
- [OutputFormat](core_src.md#outputformat)
- [PositionValue](core_src.md#positionvalue)
- [TransformFactory](core_src.md#transformfactory)
- [TransformOption](core_src.md#transformoption)

### Variables

- [builtinOutputFormats](core_src.md#builtinoutputformats)
- [builtins](core_src.md#builtins)
- [fitValues](core_src.md#fitvalues)
- [formatValues](core_src.md#formatvalues)
- [kernelValues](core_src.md#kernelvalues)
- [positionShorthands](core_src.md#positionshorthands)
- [positionValues](core_src.md#positionvalues)

### Functions

- [applyTransforms](core_src.md#applytransforms)
- [blur](core_src.md#blur)
- [extractEntries](core_src.md#extractentries)
- [flatten](core_src.md#flatten)
- [flip](core_src.md#flip)
- [flop](core_src.md#flop)
- [format](core_src.md#format)
- [generateImageID](core_src.md#generateimageid)
- [generateTransforms](core_src.md#generatetransforms)
- [getBackground](core_src.md#getbackground)
- [getFit](core_src.md#getfit)
- [getKernel](core_src.md#getkernel)
- [getLossless](core_src.md#getlossless)
- [getMetadata](core_src.md#getmetadata)
- [getPosition](core_src.md#getposition)
- [getProgressive](core_src.md#getprogressive)
- [getQuality](core_src.md#getquality)
- [grayscale](core_src.md#grayscale)
- [hsb](core_src.md#hsb)
- [imgFormat](core_src.md#imgformat)
- [invert](core_src.md#invert)
- [loadImage](core_src.md#loadimage)
- [lqipPictureFormat](core_src.md#lqipPictureformat)
- [median](core_src.md#median)
- [metadataFormat](core_src.md#metadataformat)
- [normalize](core_src.md#normalize)
- [parseURL](core_src.md#parseurl)
- [pictureFormat](core_src.md#pictureformat)
- [resize](core_src.md#resize)
- [resolveConfigs](core_src.md#resolveconfigs)
- [rotate](core_src.md#rotate)
- [setMetadata](core_src.md#setmetadata)
- [srcsetFormat](core_src.md#srcsetformat)
- [tint](core_src.md#tint)
- [urlFormat](core_src.md#urlformat)

## Type Aliases

### FitValue

Ƭ **FitValue**: typeof [`fitValues`](core_src.md#fitvalues)[`number`]

#### Defined in

[packages/core/src/transforms/fit.ts:6](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/fit.ts#L6)

___

### FormatValue

Ƭ **FormatValue**: typeof [`formatValues`](core_src.md#formatvalues)[`number`]

#### Defined in

[packages/core/src/transforms/format.ts:10](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/format.ts#L10)

___

### ImageConfig

Ƭ **ImageConfig**: `Record`<`string`, `string` \| `string`[]\>

#### Defined in

[packages/core/src/types.ts:37](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L37)

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

[packages/core/src/types.ts:61](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L61)

___

### KernelValue

Ƭ **KernelValue**: typeof [`kernelValues`](core_src.md#kernelvalues)[`number`]

#### Defined in

[packages/core/src/transforms/kernel.ts:6](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/kernel.ts#L6)

___

### OutputFormat

Ƭ **OutputFormat**: (`args?`: `string`[]) => (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

#### Type declaration

▸ (`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### PositionValue

Ƭ **PositionValue**: typeof [`positionValues`](core_src.md#positionvalues)[`number`]

#### Defined in

[packages/core/src/transforms/position.ts:38](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/position.ts#L38)

___

### TransformFactory

Ƭ **TransformFactory**<`A`\>: (`metadata`: `Partial`<[`ImageConfig`](core_src.md#imageconfig) & `A`\>, `ctx`: [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md)) => [`ImageTransformation`](core_src.md#imagetransformation) \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `Record`<`string`, `unknown`\> |

#### Type declaration

▸ (`metadata`, `ctx`): [`ImageTransformation`](core_src.md#imagetransformation) \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & `A`\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

##### Returns

[`ImageTransformation`](core_src.md#imagetransformation) \| `undefined`

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### TransformOption

Ƭ **TransformOption**<`A`, `T`\>: (`metadata`: `Partial`<[`ImageConfig`](core_src.md#imageconfig) & `A`\>, `image`: `Sharp`) => `T` \| `undefined`

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
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & `A`\> |
| `image` | `Sharp` |

##### Returns

`T` \| `undefined`

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

## Variables

### builtinOutputFormats

• `Const` **builtinOutputFormats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `img` | [`OutputFormat`](core_src.md#outputformat) |
| `meta` | [`OutputFormat`](core_src.md#outputformat) |
| `metadata` | [`OutputFormat`](core_src.md#outputformat) |
| `picture` | [`OutputFormat`](core_src.md#outputformat) |
| `srcset` | [`OutputFormat`](core_src.md#outputformat) |
| `url` | [`OutputFormat`](core_src.md#outputformat) |

#### Defined in

[packages/core/src/output-formats.ts:112](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/output-formats.ts#L112)

___

### builtins

• `Const` **builtins**: ([`TransformFactory`](core_src.md#transformfactory)<[`BlurOptions`](../interfaces/core_src.BlurOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`FlattenOptions`](../interfaces/core_src.FlattenOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`FlipOptions`](../interfaces/core_src.FlipOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`FlopOptions`](../interfaces/core_src.FlopOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`FormatOptions`](../interfaces/core_src.FormatOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`GrayscaleOptions`](../interfaces/core_src.GrayscaleOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`HSBOptions`](../interfaces/core_src.HSBOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`InvertOptions`](../interfaces/core_src.InvertOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`MedianOptions`](../interfaces/core_src.MedianOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`NormalizeOptions`](../interfaces/core_src.NormalizeOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`ResizeOptions`](../interfaces/core_src.ResizeOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`RotateOptions`](../interfaces/core_src.RotateOptions.md)\> \| [`TransformFactory`](core_src.md#transformfactory)<[`TintOptions`](../interfaces/core_src.TintOptions.md)\>)[]

#### Defined in

[packages/core/src/builtins.ts:15](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/builtins.ts#L15)

___

### fitValues

• `Const` **fitValues**: readonly [``"cover"``, ``"contain"``, ``"fill"``, ``"inside"``, ``"outside"``]

#### Defined in

[packages/core/src/transforms/fit.ts:4](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/fit.ts#L4)

___

### formatValues

• `Const` **formatValues**: readonly [``"avif"``, ``"jpg"``, ``"jpeg"``, ``"png"``, ``"heif"``, ``"webp"``, ``"tiff"``]

#### Defined in

[packages/core/src/transforms/format.ts:8](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/format.ts#L8)

___

### kernelValues

• `Const` **kernelValues**: readonly [``"nearest"``, ``"cubic"``, ``"mitchell"``, ``"lanczos2"``, ``"lanczos3"``]

#### Defined in

[packages/core/src/transforms/kernel.ts:4](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/kernel.ts#L4)

___

### positionShorthands

• `Const` **positionShorthands**: `string`[]

#### Defined in

[packages/core/src/transforms/position.ts:27](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/position.ts#L27)

___

### positionValues

• `Const` **positionValues**: readonly [``"top"``, ``"right top"``, ``"right"``, ``"right bottom"``, ``"bottom"``, ``"left bottom"``, ``"left"``, ``"left top"``, ``"north"``, ``"northeast"``, ``"east"``, ``"southeast"``, ``"south"``, ``"southwest"``, ``"west"``, ``"northwest"``, ``"center"``, ``"centre"``, ``"entropy"``, ``"attention"``]

#### Defined in

[packages/core/src/transforms/position.ts:4](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/transforms/position.ts#L4)

## Functions

### applyTransforms

▸ **applyTransforms**(`transforms`, `image`, `removeMetadata?`): `Promise`<[`TransformResult`](../interfaces/core_src.TransformResult.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transforms` | [`ImageTransformation`](core_src.md#imagetransformation)[] | `undefined` |
| `image` | `Sharp` | `undefined` |
| `removeMetadata` | `boolean` | `true` |

#### Returns

`Promise`<[`TransformResult`](../interfaces/core_src.TransformResult.md)\>

#### Defined in

[packages/core/src/lib/apply-transforms.ts:5](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/apply-transforms.ts#L5)

___

### blur

▸ **blur**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`BlurOptions`](../interfaces/core_src.BlurOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

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

[packages/core/src/lib/parse-url.ts:5](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/parse-url.ts#L5)

___

### flatten

▸ **flatten**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`FlattenOptions`](../interfaces/core_src.FlattenOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### flip

▸ **flip**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`FlipOptions`](../interfaces/core_src.FlipOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### flop

▸ **flop**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`FlopOptions`](../interfaces/core_src.FlopOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### format

▸ **format**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`FormatOptions`](../interfaces/core_src.FormatOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### generateImageID

▸ **generateImageID**(`url`, `config`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `URL` |
| `config` | [`ImageConfig`](core_src.md#imageconfig) |

#### Returns

`string`

#### Defined in

[packages/core/src/util.ts:10](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/util.ts#L10)

___

### generateTransforms

▸ **generateTransforms**(`config`, `factories`, `manualSearchParams`, `logger?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ImageConfig`](core_src.md#imageconfig) |
| `factories` | [`TransformFactory`](core_src.md#transformfactory)[] |
| `manualSearchParams` | `URLSearchParams` |
| `logger?` | [`Logger`](../interfaces/core_src.Logger.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `parametersUsed` | `Set`<`string`\> |
| `transforms` | [`ImageTransformation`](core_src.md#imagetransformation)[] |

#### Defined in

[packages/core/src/lib/generate-transforms.ts:4](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/generate-transforms.ts#L4)

___

### getBackground

▸ **getBackground**(`metadata`, `image`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`BackgroundOptions`](../interfaces/core_src.BackgroundOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### getFit

▸ **getFit**(`metadata`, `image`): `undefined` \| ``"cover"`` \| ``"contain"`` \| ``"fill"`` \| ``"inside"`` \| ``"outside"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`FitOptions`](../interfaces/core_src.FitOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"cover"`` \| ``"contain"`` \| ``"fill"`` \| ``"inside"`` \| ``"outside"``

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### getKernel

▸ **getKernel**(`metadata`, `image`): `undefined` \| ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`KernelOptions`](../interfaces/core_src.KernelOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"nearest"`` \| ``"cubic"`` \| ``"mitchell"`` \| ``"lanczos2"`` \| ``"lanczos3"``

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### getLossless

▸ **getLossless**(`metadata`, `image`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`LosslessOptions`](../interfaces/core_src.LosslessOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

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

[packages/core/src/lib/metadata.ts:16](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/metadata.ts#L16)

___

### getPosition

▸ **getPosition**(`metadata`, `image`): `undefined` \| ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`PositionOptions`](../interfaces/core_src.PositionOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| ``"top"`` \| ``"right top"`` \| ``"right"`` \| ``"right bottom"`` \| ``"bottom"`` \| ``"left bottom"`` \| ``"left"`` \| ``"left top"`` \| ``"north"`` \| ``"northeast"`` \| ``"east"`` \| ``"southeast"`` \| ``"south"`` \| ``"southwest"`` \| ``"west"`` \| ``"northwest"`` \| ``"center"`` \| ``"centre"`` \| ``"entropy"`` \| ``"attention"``

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### getProgressive

▸ **getProgressive**(`metadata`, `image`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`ProgressiveOptions`](../interfaces/core_src.ProgressiveOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### getQuality

▸ **getQuality**(`metadata`, `image`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`QualityOptions`](../interfaces/core_src.QualityOptions.md)\> |
| `image` | `Sharp` |

#### Returns

`undefined` \| `number`

#### Defined in

[packages/core/src/types.ts:56](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L56)

___

### grayscale

▸ **grayscale**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`GrayscaleOptions`](../interfaces/core_src.GrayscaleOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### hsb

▸ **hsb**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`HSBOptions`](../interfaces/core_src.HSBOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### imgFormat

▸ **imgFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### invert

▸ **invert**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`InvertOptions`](../interfaces/core_src.InvertOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### loadImage

▸ **loadImage**(`path`): `Sharp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Sharp`

#### Defined in

[packages/core/src/util.ts:6](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/util.ts#L6)

___

### lqipPictureFormat

▸ **lqipPictureFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### median

▸ **median**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`MedianOptions`](../interfaces/core_src.MedianOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### metadataFormat

▸ **metadataFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### normalize

▸ **normalize**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`NormalizeOptions`](../interfaces/core_src.NormalizeOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

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

[packages/core/src/lib/parse-url.ts:1](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/parse-url.ts#L1)

___

### pictureFormat

▸ **pictureFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### resize

▸ **resize**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`ResizeOptions`](../interfaces/core_src.ResizeOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### resolveConfigs

▸ **resolveConfigs**(`entries`, `outputFormats`): `Record`<`string`, `string` \| `string`[]\>[]

This function builds up all possible combinations the given entries can be combined
and returns it as an array of objects that can be given to a the transforms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entries` | [`string`, `string`[]][] | The url parameter entries |
| `outputFormats` | `Record`<`string`, [`OutputFormat`](core_src.md#outputformat)\> | - |

#### Returns

`Record`<`string`, `string` \| `string`[]\>[]

An array of directive options

#### Defined in

[packages/core/src/lib/resolve-configs.ts:17](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/resolve-configs.ts#L17)

___

### rotate

▸ **rotate**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`RotateOptions`](../interfaces/core_src.RotateOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

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

[packages/core/src/lib/metadata.ts:12](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/lib/metadata.ts#L12)

___

### srcsetFormat

▸ **srcsetFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)

___

### tint

▸ **tint**(`metadata`, `ctx`): `undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `Partial`<[`ImageConfig`](core_src.md#imageconfig) & [`TintOptions`](../interfaces/core_src.TintOptions.md)\> |
| `ctx` | [`TransformFactoryContext`](../interfaces/core_src.TransformFactoryContext.md) |

#### Returns

`undefined` \| [`ImageTransformation`](core_src.md#imagetransformation)

#### Defined in

[packages/core/src/types.ts:51](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L51)

___

### urlFormat

▸ **urlFormat**(`args?`): (`metadata`: [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[]) => `unknown`

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
| `metadata` | [`ProcessedImageMetadata`](../interfaces/core_src.ProcessedImageMetadata.md)[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/types.ts:71](https://github.com/JonasKruckenberg/imagetools/blob/4ebc88f/packages/core/src/types.ts#L71)
