# Caching

To speed up a build pipeline with many images, the generated images can be cached on disk. 
If the source image changes, the cached images will be regenerated.

## How to configure caching

Caching is enabled by default and uses './node_modules/.cache/imagetools' as the cache directory. 
You can disable caching or change the directory with options.

```
// vite.config.js, etc
...
    plugins: [
      react(),
      imagetools({
        cache: {
          enabled: true,
          dir: './node_modules/.cache/imagetools'
        }
      })
    ]
...
```

## Cache retention to remove unused images

When an image is no longer there or the transformation parameters change, the previously
cached images will be removed after a configurable retention period.
A value of `undefined` will disable this mechanism, which is the default.

```
// vite.config.js, etc
...
    plugins: [
      react(),
      imagetools({
        cache: {
          enabled: true,
          dir: './node_modules/.cache/imagetools',
          retention: 172800
        }
      })
    ]
...
```
