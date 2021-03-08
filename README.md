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

- [ ] ~Worker support~
- [x] Custom directives
- [ ] Query parameter passthrough 
- [ ] Srcset output
- [x] Metadata output
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
``

## License
[MIT © Jonas Kruckenberg.](./LICENSE)