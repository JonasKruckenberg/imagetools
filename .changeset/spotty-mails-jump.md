---
'vite-imagetools': patch
---

Keep the `format` directive's value when restoring images from the build cache, so emitted asset filenames no longer flip between `.jpg` (cache miss) and `.jpeg` (cache hit). Generalizes the existing avif/heif cache workaround to all formats whose sharp-reported name differs from the directive value.
