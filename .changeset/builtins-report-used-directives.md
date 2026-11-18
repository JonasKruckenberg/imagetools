---
'imagetools-core': patch
---

Report the directives the built-in transforms act on in `parametersUsed`

`generateTransforms` returns `parametersUsed`, but none of the built-in transform factories called `useParam`, so it was
always empty for them. They now report every directive their transform reads, and `noAutoOrient` whenever it is set. A
directive is left out when nothing reads it (a typo such as `?widht=300`), when the transform that would read it is not
generated (`?fit=cover` without a size), or when its value turns the transform off (`?blur=0`). Integrations can compare
`parametersUsed` with the directives they were given to find the ones that had no effect. Values are not validated, and
`basePixels`, which the output formats read, is not reported.
