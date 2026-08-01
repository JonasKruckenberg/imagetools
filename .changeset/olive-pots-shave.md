---
'vite-imagetools': patch
---

perf: hash the source file bytes instead of a decoded buffer when building cache keys, so the plugin no longer pays a full sharp decode for every image on every build
