---
'vite-imagetools': patch
---

fix: serve cached bytes verbatim in dev so a cache hit is byte-identical to the original render instead of re-encoding lossy images
