# Extending

The api of imagetools has been designed to be as extensible as possible, meaning writing new directives and output
formats is really easy!

## Custom Directive

A Directive is basically a function that takes a configuration object and returns a transformation function. Think of it
as a different name for factory function. (The source code also refers to it as transformFactories)

The signature is as follows:

```ts
type TransformFactory<A = {}> = (
  metadata: Partial<ImageConfig & A>,
  ctx: TransformFactoryContext
) => ImageTransformation | undefined
```

## Example

Say you're using the following import statement very often

```
<url>?w=<width>&format=webp
```

Instead of writing out the whole thing everytime you could write a custom directive that handles that is one go:

```js
import { resize, format } from 'imagetools'

function customDirective(config, ctx) {
  // we would like to reuse the existing directives as much as possible
  const resizeTransform = resize({ w: config.customKeyword }, ctx)
  const formatTransform = format({ format: 'webp' }, ctx)

  if (!resizeTransform) return

  // return the transform function
  return function customTransform(image) {
    // apply both transformations and return the result
    return formatTransform(resizeTransform(image))
  }
}
```

Let's break that down:

```ts
import { resize, format } from 'imagetools'
```

`vite-imagetools` exports all directives so you can reuse them in you own directives, as we will see shortly.

```ts
function customDirective(config, ctx) {
```

transformFactories are executed on every image that get's processed, their responsibility is to parse the incoming
arguments (they are all strings to begin with) and determine wether the transform should be applied to the image. If
true it must return a function that does the actual transformation, if false it should return undefined.

```ts
const resizeTransform = resize({ width: config.customKeyword }, ctx)
const formatTransform = format({ format: 'webp' }, ctx)
```

As we would like to reuse the existing directives we invoke the with our payload, making sure to always pass the context
object so they can generate warnings and mark their keywords as being used.

```ts
if (!resizeTransform) return
```

As discussed above, transformFactories will return undefined if they are not applicable, since we allow the user to pass
in a value for width, we should handle cases where the user does not specify out keyword at all.

```ts
// return the transform function
return function customTransform(image) {
  // apply both transformations and return the result
  return formatTransform(resizeTransform(image))
}
```

Lastly we return the transformation function that will apply both the resize and the format transform when invoked. We
must also always return the transformed image.

> NOTE: The image object provided to the transform function is a sharp instance, so you have access to all it's methods
> as well.

### Async ImageTransform functions

![vite-imagetools v2.4.0 and newer](https://img.shields.io/badge/imagetools--core-^2.4.0-brightgreen)
![vite-imagetools v3.5.3 and newer](https://img.shields.io/badge/vite--imagetools-^3.5.3-brightgreen)

Sometimes a transformation needs to perform some asynchronous action. To accommodate this, ImageTransform functions can
return a promise that resolved with the sharp instance once the transformation is done.

```ts
function customDirective(): ImageTransform {
  return async (image) => {
    return longAsyncTask(image)
  }
}
```

## Custom Output Formats

_TODO_

## Custom config resolution

Sometimes it's useful to be able to override the resolution of image configs at a low level, for example
to implement presets using shortnames that generate multiple images. This resolution is done before the config
is passed to the directives. To implement a custom scheme, pass a function as `resolveConfigs` plugin options.

The function should return a new config array. If a plugin needs to modify the config that would have been used,
it can call the default `resolveConfigs` function which is part of the public API.

Below is an example custom `resolveConfigs` to implement site preset widths which are always webp format.

```ts
const defaultPresets = {
  default: {widths: [300, 800, 1200]}
}

export function resolveConfigsWithPresets(pluginConfig) {
    // use provided presets or use defaults above 
    const presets = pluginConfig?.presets || defaultPresets

    // this is the custom resolveConfigs function 
    return function (config) {
        // look for 'mysite' in the import name
        const mysite_config = config.find(([key]) => key === "mysite")
        if (mysite_config) {
            // get the preset if specified
            const [, [value]] = mysite_config
            // see if there is a custom preset specified, eg: mysite=mypreset, or use default
            const preset_name = value.trim().length ? value.trim() : "default"
            // fall back to default preset if one given doesn't exist
            const preset = presets[preset_name] || defaultPresets.default

            // map preset widths to 
            const widths = preset.widths
            return widths.map((width, index) => ({
                width,
                webp: ""
            }));
        }
        // else return undefined and default resolveConfigs will be called
    }
}
```

```
// vite.config.js, etc
...
    plugins: [
      react(),
      imagetools({
        resolveConfigs: resolveConfigsWithPresets({ 
            mypreset: {widths: [100,200,300]} 
        })
      })
    ]
...
```

```
// page.tsx, etc
import img_urls from "./myimage.png?mypreset"
```
