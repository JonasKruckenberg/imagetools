---
'vite-imagetools': minor
---

fix: only process images whose query asks something of imagetools

Any query at all used to send an image through imagetools, so vite's own asset queries — `?url`, `?raw`, `?inline` and combinations such as `?url&no-inline` — were decoded and re-encoded with sharp's defaults, which can make the emitted image larger than the source. An image is now only processed when its query selects an output format with `as` or names a directive one of the transforms acts on, and is otherwise left to vite. Queries that combine the two, such as `?format=webp&inline`, are processed as before.
