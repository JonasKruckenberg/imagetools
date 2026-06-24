---
"vite-imagetools": patch
---

fix: use atomic write for cache files to prevent corrupt reads

Node's writeFile opens the target with O_TRUNC, zeroing it before the
data arrives. A concurrent build process can read that window and pass
a truncated buffer to sharp, producing a "corrupt header" error that
points at the image asset rather than the cache.

Fix: write to a uniquely-named temp file (.id.XXXXXX) in the same
directory, then rename() to the final path. rename() is a single
atomic syscall. Concurrent readers will only see a complete file.

The temp file follows the same convention as rsync: a dot-prefixed
name with a random suffix, written in the same destination dir to
ensure that the filesystem stays the same.
