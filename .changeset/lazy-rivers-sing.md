---
"vite-imagetools": patch
---

Report the encoded image's metadata on a cache miss

A metadata import now reports the same raw sharp metadata whether the image came from the cache or a fresh process: the cache-miss path reads the encoded output's metadata instead of the source image's, so fields like `isProgressive`, `hasAlpha`, `pages` or `density` no longer differ between the two.
