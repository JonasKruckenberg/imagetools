---
'vite-imagetools': patch
---

Respond to an unknown image id instead of throwing

The dev-server middleware threw when an id was missing from the generated-images
map. The response status was already 404, but throwing additionally made Vite
classify it as an internal server error, which raises the dev error overlay over
the whole page — and in a browser test harness that overlay sits above the page
and silently swallows clicks aimed at it. The thrown stack was also misleading,
unwinding through middleware registered earlier so its top frames were unrelated
ones such as `hostValidation` and `cors` rather than the plugin.

The miss is now answered with a 404 whose body names the id, and the diagnostic
is logged rather than thrown.
