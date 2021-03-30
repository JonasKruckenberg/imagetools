# Extending

The api of imagetools has been designed to be as extensible as possible, meaning writing new directives and output formats is really easy!

## Custom Directive

A Directive is basically a function that takes a configuration object and returns a transformation function. Think of it as a different name for factory function. (The source code also refers to it as transformFactories)

The signature is as follows:

```ts
type TransformFactory<A = {}> = (metadata: Partial<ImageConfig & A>, ctx: TransformFactoryContext) => ImageTransformation | undefined
```

## Directive Context



## Example

Say you're using the following import statement very often
```
<url>?width=<width>&format=webp
```
Instead of writing out the whole thing everytime you could write a custom directive that handles that is one go:
```js
import { resize, format } from "imagetools"

function customDirective(config, ctx) {
    // we would like to reuse the existing directives as much as possible
    const resizeTransform = resize({ width: config.customKeyword }, ctx)
    const formatTransform = format({ format: "webp" }, ctx)

    if(!resizeTransform) return

    // return the transform function
    return function customTransform(image) {
        // apply both transformations and return the result
        return formatTransform(resizeTransform(image))
    }
}

```

Let's break that down:

```ts
import { resize, format } from "imagetools"
```

Vite-imagetools exports all directives so you can reuse them in you own directives, as we will see shortly.

```ts
function customDirective(config, ctx) {
```

transformFactories are executed on every image that get's processed, their responsibility is to parse the incoming arguments (they are all strings to begin with) and determine wether the transform should be applied to the image.
If true it must return a function that does the actual transformation, if false it should return undefined.

```ts
const resizeTransform = resize({ width: config.customKeyword }, ctx)
const formatTransform = format({ format: "webp" }, ctx)
```

As we would like to reuse the existing directives we invoke the with our payload, making sure to always pass the context object so they can generate warnings and mark their keywords as being used.

```ts
if(!resizeTransform) return
```

As discussed above, transformFactories will return undefined if they are not applicable, since we allow the user to pass in a value for width, we should handle cases where the user does not specify out keyword at all.

```ts
// return the transform function
return function customTransform(image) {
    // apply both transformations and return the result
    return formatTransform(resizeTransform(image))
}
```

Lastly we return the transformation function that will apply both the resize and the format transform when invoked.
We must also always return the transformed image.

> NOTE: The image object provided to the transform function is a sharp instance, so you have access to all it's methods as well.

## Custom Output Formats

_TODO_