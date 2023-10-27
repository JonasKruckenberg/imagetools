# Simple example using vite

This simple example shows the usage of imagetools with vite. To follow along open this folder and type `pnpm install`,
then `pnpm dev` to start the Vite development server. Now you can open the [main.js file](./main.js) to see imagetools
in action!

The example creates a simple `picture` element, that has 2 different dynamically generated sources. One in the `avif`
image format and one in `webp` for all browsers that don't support avif (like safari).

```ts
import srcsetAvif from '../example.jpg?w=500;700;900;1200&format=avif&as=srcset'
import srcsetWebp from '../example.jpg?w=500;700;900;1200&format=webp&as=srcset'
```

The last import above for example instructs imagetools to do the following:

1. generate 4 differently sized images
2. convert each image into the webp format
3. generate a srcset string that holds all generated urls. It will look similar to this:
   `example-700.webp 500w, example-700.webp 700w, example-900.webp 900w, example-1200.webp 1200w`

> In development mode these urls will look very different because imagetools generates a unique ID for each image. This
> helps you browser to cache the generated image.

We also generate a fallback image on the fly and import it with it's metadata:

```ts
import { src as placeholder, width, height } from '../example.jpg?w=300&as=metadata'
```

Which instructs imagetools to first resize the image and the return us the whole metadata object.
