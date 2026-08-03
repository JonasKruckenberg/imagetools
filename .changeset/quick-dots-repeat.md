---
"vite-imagetools": major
"imagetools-core": major
---

Drop applied-transform directives from the `as=metadata` output

The `as=metadata` export no longer includes the applied-transform directive values (`flip`, `quality`, `rotate`, ...), only the final output `width`, `height`, `format`, the image's sharp metadata and the `src`. The applied transforms cannot be reconstructed from a cached file, so previously a metadata import that hit a cache entry could fail with a `MISSING_EXPORT` error or silently omit those fields; dropping them makes the export deterministic across cache hits and misses.
