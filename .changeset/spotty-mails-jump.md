---
'vite-imagetools': patch
---

fix: keep the `format` directive's value when restoring images from the build cache, so emitted asset filenames no longer flip between `.jpg` and `.jpeg`
