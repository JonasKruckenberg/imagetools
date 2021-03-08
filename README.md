# vite-imagetools :toolbox:

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A toolbox of custom import directives that can transform your image at compile-time.
All of the image transformations are powered by [sharp](https://sharp.pixelplumbing.com).

> :warning: This is the development branch of v3! <br>
> Try it out and leave feedback via the issues!<br>

## Table of Contents

- [Roadmap](#roadmap)
- [Install](#install)
- [Options](#options)
- [Contributing](#contributing)
- [License](#license)

## Roadmap

- [ ] Worker support
- [ ] Custom directives
- [ ] Query parameter passthrough 
- [ ] Srcset output
- [ ] Metadata output
- [ ] Full test coverage

### Directives
- [x] **Resize** (i.e. `width`,`w`,`height`,`h`,`resize`)
- [x] **Rotate**
- [x] **Format** (`format` and it's shorthands)
- [ ] **flip**
- [ ] **flop**
- [ ] **sharpen**
- [ ] **blur**
- [ ] **median**
- [ ] **flatten**
- [ ] **gamma**
- [ ] **invert**
- [ ] **normalize**
- [ ] **tint**
- [ ] **grayscale**
- [ ] **toColorspace**
- [ ] **pad**
- [ ] **crop**
- [ ] **trim**
- [ ] **hue**
- [ ] **saturation**
- [ ] **brightness**

## Install

With [npm](https://npmjs.com):
```
npm install --dev vite-imagetools@next
```
Or with [yarn](https://yarnpkg.com):
```
yarn add --dev vite-imagetools@next
```
<!--
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

This for example will resize the image to 1200x900 pixels, using the object-fit cover and keeping the top of the image in view. It will also produce a webp image from the jpeg source.

You can of course also import images from javascript like so:
```typescript
import Image from 'example.jpg?format=avif'
```

### Options

All plugin options are optional.

#### `include`
**Type**: _string_ | _RegExp_ | Array<_string_ | _RegExp_><br/>
**Default**: `['**/*.jpg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.webp', '**/*.avif', '**/*.gif', '**/*.heif']`<br/>

Which files to include when processing.

#### `exclude`
**Type**: string | RegExp | Array<string | RegExp><br/>
**Default**: `['public/**/*']`<br/>

Which files to exclude when processing. By default this excludes vites _public_ folder to match the default behavior.

### `cache`
**Type**: string<br/>
**Default**: `node_modules/.cache/vite-imagetools`

The path to the folder to use as the cache. See the next section [Caching](#caching) for details.

-->

## License
[MIT © Jonas Kruckenberg.](./LICENSE)