---
"vite-imagetools": major
"imagetools-core": major
---

Make `ImageConfig` a record of single-string directives, excluding output-format parameters

`ImageConfig` values are now always single strings. The output-format parameters that previously kept their array values on `config` no longer appear in the configs at all:

- `resolveConfigs` now returns an array of single-value directive records (`ImageConfig[]`), excluding the output-format parameters and the `as` output format selector that previously appeared as array values on `config`.
- Transform factories and options now receive only the single-value directives, so `metadata[key]` is `string | undefined` rather than `string | string[] | undefined`.
- Output format parameters and the `as` selector no longer affect the generated cache id, since they only influence how the already-processed image is serialized. URLs that differ only in these parameters share a single cache entry.
- Every key in `outputFormats` is excluded from the configs, including custom output formats. A custom output format whose name collides with a transform directive name suppresses that directive (e.g. a custom output format named `blur` makes `?blur=5` stop applying the blur transform); name custom output formats to avoid directive names, since any key matching an output format is dropped from the configs.
