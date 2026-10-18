---
'vite-imagetools': patch
---

fix: let concurrent builds each emit their own assets

Two Vite builds running at the same time in one process, such as the client and SSR builds of a framework that builds environments in parallel, could fail with "Unable to get file name for unknown file". The in-flight transform shared between them already held the asset reference emitted by whichever build started first. Only the image transform is shared now; each build emits its own asset.
