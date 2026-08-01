---
'imagetools-core': major
'vite-imagetools': major
---

breaking: remove the `pixelDensityDescriptor` field from `ImageMetadata`. Pixel density descriptors are now derived on the fly from the `basePixels` directive and the image's rendered `width` when generating srcsets, so they no longer depend on whether the image was restored from the cache. This also fixes `basePixels` producing width descriptors instead of density descriptors whenever a `rotate` directive changes the rendered dimensions, and makes `basePixels` emit a density descriptor even when used without a `w`/`h`/`aspect` directive (previously it silently fell back to a width descriptor).

The `vite-imagetools` plugin now also reports the actual rendered width and height on the image metadata instead of the values declared by the transforms (which `rotate` never updates). The dimensions are reconciled against the encoded output on every transformation, not just when the cache is enabled, so metadata and the descriptors derived from it match the image that is actually served.

The config used to generate each image is now a required `ProcessedImageMetadata.config` field, which output format implementations can use to derive density descriptors. It is omitted from the `as=metadata` output.
