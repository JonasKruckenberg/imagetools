# vite-imagetools :toolbox:

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


A toolbox of custom import directives that can transform your image at compile-time.
All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Directives](#directives)
- [Contributing](#contributing)
- [License](#license)

## Install

With [npm](https://npmjs.com):
```
npm install --dev vite-imagetools
```
Or with [yarn](https://yarnpkg.com):
```
yarn add --dev vite-imagetools
```

## Usage

Add the plugin to your vite config:
```typescript
import imageset from 'vite-imagetools'

export default defineConfig({
  plugins: [
    imageset()
  ]
})
```
The you can use all the directives when importing image files:
```html
<!-- This will transcode the image into webp-->
<img src="../assets/example.jpg?webp">

<!-- This resizes the image to be width x height pixels -->
<img src="../assets/example.jpg?size=500x300">
```

You can specify any number of directives to customize almost any aspect of the image:
```html
<img src="../assets/example.jpg?size=1200x900&fit=cover&position=top?webp">
```
This for example will resize the image to 1200x900 pixels, using the object-fit cover and keeping the top of the image in view. It will also produce a webp image from the jpeg source.

You can of course also import images from javascript like so:
```typescript
import Image from 'example.jpg?format=avif'
```

### Options

All plugin options are optional.

#### `include`
**Type**: _string_ | _RegExp_ | Array<_string_ | _RegExp_><br/>
Default: `['**/*.jpg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.webp', '**/*.avif', '**/*.gif', '**/*.heif']`<br/>

Which files to include when processing.

#### `exclude`
**Type**: string | RegExp | Array<string | RegExp><br/>
**Default**: `['public/**/*']`<br/>

Which files to exclude when processing. By default this excludes vites _public_ folder to match the default behavior.

## Directives

`vite-plugin-imagset` works on a directive based workflow where you specify what transformation to apply in the import statement. 
A **Directive** is basically a querystring field followed by an optional argument like you have seen above.
```
example.jpg?directive=argument
```

Commonly used directives also expose **Shorthands**. Shorthands have no arguments.
```
example.jpg?shorthand
```
A good example for shorthands is the [`format` directive](#format)

Directives can depend on other directives and some my be incompatible with others.
Directives can also be composed into more complex directives. (The `size` directive is a good example, it is composed from the `width` and `height` directives). See [the contributing section](#contributing) for details.

Below is the list of all directives shipped by default: 

---
#### `width`
**Argument**: <_number_><br/>
Resizes the image to have a with of `width` pixels. If not set, the height will be scaled automatically to match the width.
> You cannot use `with` and `size` together.

---
#### `height`
**Argument**: <_number_><br/>
Resize the image to have a height of `height` pixels. If not set, the width will be scaled automatically to match the height.
> You cannot use `height` and `size` together.

---
#### `size`
**Argument**: <_number_>x<_number_><br/>
Sets width and height of the image simultaneously.
> When using `size` you cannot set `width` or `height`on the same resource.

---
#### `fit`
**Argument**: <_'cover'_ | _'contain'_ | _'fill'_ | _'inside'_ | _'outside'_><br/>
How the image should be resized when both `width` and `height` are given.
If only one is specified this has no effect since the missing side will be scaled to keep the aspect ratio.
The default behavior when resizing is `cover`. 

**Shorthands**
- `cover`
- `contain`
- `fill`
- `inside`
- `outside`

---
#### `position`
**Argument**: < _'top'_ | 
            _'right top'_ | 
            _'right'_ | 
            _'right bottom'_ | 
            _'bottom'_ | 
            _'left bottom'_ | 
            _'left'_ |
            _'left top'_ |
            _'north'_ |
            _'northeast'_ |
            _'east'_ |
            _'southeast'_ |
            _'south'_ |
            _'southwest'_ |
            _'west'_ | 
            _'northwest'_ | 
            _'center'_ | 
            _'entropy'_ | 
            _'attention'_><br/>
When fit is `cover` or `contain` you can specify where the image should be anchored.
The behavior is similar to the [css object-postion](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) property.
For further details on the two special values `entropy` & `attention` see the [sharp documentation](https://sharp.pixelplumbing.com/api-resize#resize)

**Shorthands**
- `top`
- `right top`
- `right`
- `right bottom`
- `bottom`
- `left bottom`
- `left`
- `left top`
- `north`
- `northeast`
- `east`
- `southeast`
- `south`
- `southwest`
- `west`
- `northwest`
- `center`
- `entropy`
- `attention

---
#### `kernel`
**Argument**: <_'nearest'_ | _'cubic'_ | _'mitchell'_ | _'lanczos2'_ | _'lanczos3'_><br/>
The interpolation kernel to use when resizing the image, the default value is `lanczos3`.

---
#### `format`
**Argument**: <_'jpeg'_ | _'jpg'_ | _'webp'_ | _'avif'_ | _'png'_ | _'gif'_ | _'tiff'_ | _'heif'_><br/>
Transcodes the image to the give format. This directive will always be applied last.
> Some of these formats my not be available on your platform/setup

Optionally you can use one of the Shorthands below like so:
```html
<!-- instead of -->
<img src="example.jpg?format=webp">
<!-- you can write -->
<img src="example.jpg?webp">
```
**Shorthands**:
- `jpeg`
- `jpg`
- `webp`
- `avif`
- `png`
- `gif`
- `tiff`
- `heif`

---
### `favicon`
_TODO_

---
### `rotate`
_TODO_

---
### `flip`
_TODO_

---
### `flop`
_TODO_

---
### `sharpen`
_TODO_

---
### `blur`
_TODO_

---
### `median`
_TODO_

---
### `flatten`
_TODO_

---
### `gamma`
_TODO_

---
### `invert`
_TODO_

---
### `normalize`
_TODO_

## Contributing

Saw a _TODO_ somewhere above? Chances are these are features I didn't have time for yet, so if you want this feature to be implemented have a look at the [custom directive section](#custom%20directives) below.
PRs are very welcome!

See [the contributing file](CONTRIBUTING.md)!

### Custom Directives

_TODO_

## License
[MIT © Jonas Kruckenberg.](./LICENSE)
