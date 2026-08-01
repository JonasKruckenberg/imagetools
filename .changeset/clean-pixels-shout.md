---
'imagetools-core': major
'vite-imagetools': major
---

breaking: `ImageMetadata` is no longer a flat object extending sharp's `Metadata`. It is now `{ info: { width, height, autoOrient }, transforms: AppliedTransforms }`, where `transforms` records the values applied by each transform. Custom transforms and output formats that read or write these fields must be updated to the new shape.

breaking: `TransformOption` and `ImageTransformation` now receive the threaded `ImageMetadata` as their first argument instead of reading and writing state on the sharp instance. The `getMetadata`/`setMetadata` functions and the `METADATA` symbol are removed. `ProcessedImageMetadata` is renamed `ProcessedImage`, `TransformResult` is renamed `ApplyTransformsResult`, and `TransformState` is renamed `AppliedTransforms`.

Custom transforms that previously stored their own values on `image[METADATA]` can record them on `state.transforms` instead. Because `AppliedTransforms` is an exported `interface`, it can be extended from your own code via declaration merging to add typed custom fields:

```ts
declare module 'imagetools-core' {
  interface AppliedTransforms {
    myCustomValue?: string
  }
}
```

Values written to `state.transforms` are included in the `as=metadata` output, so this also lets custom output formats consume them.

breaking: the `pixelDensityDescriptor` field is removed from `ImageMetadata`. Pixel density descriptors are now derived on the fly from the `basePixels` directive and the rendered image width, so they no longer depend on the build cache and work with or without a `w`/`h`/`aspect` directive.

The `vite-imagetools` plugin now reports the actual rendered width and height on the metadata, reconciled against the encoded output on every transformation, instead of the values declared by the transforms (which `rotate` never updated). The `as=metadata` output keeps its previous flat shape, so it is unchanged for existing users.
