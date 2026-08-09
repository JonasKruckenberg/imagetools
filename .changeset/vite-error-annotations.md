---
"vite-imagetools": minor
---

Improve error messages for easier debugging

- `vite-imagetools` now attaches the module id (source image path and directives) to errors thrown while transforming an image or generating its output, so failures from sharp or the `picture` (and other) output formats identify the offending import.
- When clamping requested dimensions to the intrinsic image size, non-numeric `w`/`h` values are left untouched so the transform can report the invalid directive instead of silently substituting the intrinsic size, and values are no longer clamped when the source metadata exposes no intrinsic size.
