---
"vite-imagetools": major
"rollup-plugin-imagetools": major
"imagetools-core": major
---

change `defaultDirectives` from `Record<string,string>` to `URLSearchParams`, to align with in-code interface and to allow for multiple entries of *key* with multiple *values*