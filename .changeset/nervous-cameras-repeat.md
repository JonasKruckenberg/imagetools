---
'vite-imagetools': patch
---

fix: write build cache entries atomically, so an interrupted build can't leave a truncated entry that later builds read back as valid
