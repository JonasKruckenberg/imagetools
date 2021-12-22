# Change Log

## 3.0.2

### Patch Changes

- 64356e6: chore(deps-dev): bump sharp from 2.8.2 to 2.9.3

## 3.0.1

### Patch Changes

- e58e2cb: Remove `icc` metadata when `removeMetadata` is set to true.

## 3.0.0

### Major Changes

- f6cec96: change `defaultDirectives` from `Record<string,string>` to `URLSearchParams`, to align with in-code interface
  and to allow for multiple entries of _key_ with multiple _values_

## 2.8.0

### Minor Changes

- c70b97e: Add metadata whitelist

## 2.7.6

### Patch Changes

- 0ceabff: chore(deps): bump sharp from 0.28.2 to 0.28.3

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.7.5](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.7.4...imagetools-core@2.7.5) (2021-05-11)

**Note:** Version bump only for package imagetools-core

## [2.7.4](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.7.3...imagetools-core@2.7.4) (2021-05-11)

**Note:** Version bump only for package imagetools-core

## [2.7.3](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.7.2...imagetools-core@2.7.3) (2021-05-11)

**Note:** Version bump only for package imagetools-core

## [2.7.2](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.7.1...imagetools-core@2.7.2) (2021-05-11)

### Reverts

- Revert to older sharp version
  ([9a6ce0a](https://github.com/JonasKruckenberg/imagetools/commit/9a6ce0a9ee00150944aebeb12badf356a2f71279))

## [2.7.1](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.7.0...imagetools-core@2.7.1) (2021-05-11)

### Reverts

- Revert to older sharp version
  ([9a6ce0a](https://github.com/JonasKruckenberg/imagetools/commit/9a6ce0a9ee00150944aebeb12badf356a2f71279))

# [2.7.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.6.0...imagetools-core@2.7.0) (2021-05-07)

### Bug Fixes

- Refactor & resize directive
  ([5b2fca0](https://github.com/JonasKruckenberg/imagetools/commit/5b2fca0b3ef02ddf7cb9667648de68df9316c448)), closes
  [#91](https://github.com/JonasKruckenberg/imagetools/issues/91)
- update background directive
  ([d01b446](https://github.com/JonasKruckenberg/imagetools/commit/d01b44672b1ffadc41bf2497a82d63244176d1cf))
- use replace with regex for older node versions
  ([8e86de1](https://github.com/JonasKruckenberg/imagetools/commit/8e86de17658fbcdf8fb9b07f683f2dfc29e09ca3))

### Features

- Allow # symbols in src urls
  ([b5beedd](https://github.com/JonasKruckenberg/imagetools/commit/b5beedd3707167aad9302737d1012f35a3f19776))
- Allow ImageTransform functions to be async
  ([da3e726](https://github.com/JonasKruckenberg/imagetools/commit/da3e7264d8ae3276dfe76d3394e8764c783d9d50)), closes
  [#88](https://github.com/JonasKruckenberg/imagetools/issues/88)

# [2.6.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.5.0...imagetools-core@2.6.0) (2021-05-07)

### Bug Fixes

- update background directive
  ([d01b446](https://github.com/JonasKruckenberg/imagetools/commit/d01b44672b1ffadc41bf2497a82d63244176d1cf))
- use replace with regex for older node versions
  ([8e86de1](https://github.com/JonasKruckenberg/imagetools/commit/8e86de17658fbcdf8fb9b07f683f2dfc29e09ca3))

### Features

- Allow # symbols in src urls
  ([b5beedd](https://github.com/JonasKruckenberg/imagetools/commit/b5beedd3707167aad9302737d1012f35a3f19776))
- Allow ImageTransform functions to be async
  ([da3e726](https://github.com/JonasKruckenberg/imagetools/commit/da3e7264d8ae3276dfe76d3394e8764c783d9d50)), closes
  [#88](https://github.com/JonasKruckenberg/imagetools/issues/88)

# [2.5.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.3.3...imagetools-core@2.5.0) (2021-05-07)

### Features

- Allow ImageTransform functions to be async
  ([da3e726](https://github.com/JonasKruckenberg/imagetools/commit/da3e7264d8ae3276dfe76d3394e8764c783d9d50)), closes
  [#88](https://github.com/JonasKruckenberg/imagetools/issues/88)

## [2.3.3](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.3.2...imagetools-core@2.3.3) (2021-05-03)

**Note:** Version bump only for package imagetools-core

## 2.3.2 (2021-05-03)

**Note:** Version bump only for package imagetools-core

## [2.3.1](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.3.0...imagetools-core@2.3.1) (2021-04-28)

### Bug Fixes

- include private metadata when applying the transforms
  ([cc46d1b](https://github.com/JonasKruckenberg/imagetools/commit/cc46d1bce74c1f7202c4d57651be29c5d2356c77))

# [2.3.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.2.0...imagetools-core@2.3.0) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))

### Features

- Add aspect ratio support to the resize directive ([#71](https://github.com/JonasKruckenberg/imagetools/issues/71))
  ([8e905da](https://github.com/JonasKruckenberg/imagetools/commit/8e905da98b9878973b79dcc36c770547bb49058f))
- Adding `ar` shorthand for aspect and support for numeric values for aspect
  ([#74](https://github.com/JonasKruckenberg/imagetools/issues/74))
  ([e96b7e3](https://github.com/JonasKruckenberg/imagetools/commit/e96b7e322a50768e7a8b395af42035c53dcb76d8))

# [2.2.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@2.1.0...imagetools-core@2.2.0) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))

### Features

- Add aspect ratio support to the resize directive ([#71](https://github.com/JonasKruckenberg/imagetools/issues/71))
  ([8e905da](https://github.com/JonasKruckenberg/imagetools/commit/8e905da98b9878973b79dcc36c770547bb49058f))
- Adding `ar` shorthand for aspect and support for numeric values for aspect
  ([#74](https://github.com/JonasKruckenberg/imagetools/issues/74))
  ([e96b7e3](https://github.com/JonasKruckenberg/imagetools/commit/e96b7e322a50768e7a8b395af42035c53dcb76d8))

# [2.1.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@0.1.0...imagetools-core@2.1.0) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))

### Features

- Add aspect ratio support to the resize directive ([#71](https://github.com/JonasKruckenberg/imagetools/issues/71))
  ([8e905da](https://github.com/JonasKruckenberg/imagetools/commit/8e905da98b9878973b79dcc36c770547bb49058f))
- Adding `ar` shorthand for aspect and support for numeric values for aspect
  ([#74](https://github.com/JonasKruckenberg/imagetools/issues/74))
  ([e96b7e3](https://github.com/JonasKruckenberg/imagetools/commit/e96b7e322a50768e7a8b395af42035c53dcb76d8))

# [2.0.0](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@0.1.0...imagetools-core@2.0.0) (2021-04-12)

**Note:** Version bump only for package imagetools-core

# 0.1.0 (2021-04-12)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.16](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@0.1.0-next.15...imagetools-core@0.1.0-next.16) (2021-04-11)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.15](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@0.1.0-next.14...imagetools-core@0.1.0-next.15) (2021-04-11)

**Note:** Version bump only for package imagetools-core

# 0.1.0-next.14 (2021-04-11)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.13](https://github.com/JonasKruckenberg/imagetools/compare/imagetools-core@0.1.0-next.12...imagetools-core@0.1.0-next.13) (2021-04-06)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.12](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.11...imagetools-core@0.1.0-next.12) (2021-04-05)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.11](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.10...imagetools-core@0.1.0-next.11) (2021-03-30)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.10](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.9...imagetools-core@0.1.0-next.10) (2021-03-30)

### Bug Fixes

- cache key generation
  ([e09434c](https://github.com/JonasKruckenberg/vite-imagetools/commit/e09434c65548230bfdce964264c0f9cc83aadd86))
- support nodejs LTS versions
  ([4abccc5](https://github.com/JonasKruckenberg/vite-imagetools/commit/4abccc53700ad55d04dc0c2142b6dc8d69ebf122)),
  closes [#51](https://github.com/JonasKruckenberg/vite-imagetools/issues/51)
- update cache key geneartion to match spec
  ([7f0a0e8](https://github.com/JonasKruckenberg/vite-imagetools/commit/7f0a0e8bf20189e12425ffaed2026120b7b5260d))

### Features

- allow metadata removal to be toggled by option
  ([5d0c781](https://github.com/JonasKruckenberg/vite-imagetools/commit/5d0c781c0a0511725c7d615e97b1e9b0c902009e))

# [0.1.0-next.9](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.8...imagetools-core@0.1.0-next.9) (2021-03-30)

### Bug Fixes

- support nodejs LTS versions
  ([4abccc5](https://github.com/JonasKruckenberg/vite-imagetools/commit/4abccc53700ad55d04dc0c2142b6dc8d69ebf122)),
  closes [#51](https://github.com/JonasKruckenberg/vite-imagetools/issues/51)

# [0.1.0-next.8](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.7...imagetools-core@0.1.0-next.8) (2021-03-19)

### Features

- **imagetools-core:** Add image id generation utility
  ([9e0673d](https://github.com/JonasKruckenberg/vite-imagetools/commit/9e0673d039273283022be761fa8a1e06f5305d1c))

# [0.1.0-next.7](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.6...imagetools-core@0.1.0-next.7) (2021-03-16)

### Bug Fixes

- readd metadata annotations
  ([afa0b4b](https://github.com/JonasKruckenberg/vite-imagetools/commit/afa0b4b60c77560b30166ed47bcebeb20198e1b2))

# [0.1.0-next.6](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.5...imagetools-core@0.1.0-next.6) (2021-03-15)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.5](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.4...imagetools-core@0.1.0-next.5) (2021-03-15)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.4](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.3...imagetools-core@0.1.0-next.4) (2021-03-15)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.3](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.2...imagetools-core@0.1.0-next.3) (2021-03-15)

### Bug Fixes

- fix imagetools core
  ([5a09e00](https://github.com/JonasKruckenberg/vite-imagetools/commit/5a09e00a518d154773599eaa0a9879352c3b923e))

# [0.1.0-next.2](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.1...imagetools-core@0.1.0-next.2) (2021-03-15)

**Note:** Version bump only for package imagetools-core

# [0.1.0-next.1](https://github.com/JonasKruckenberg/vite-imagetools/compare/imagetools-core@0.1.0-next.0...imagetools-core@0.1.0-next.1) (2021-03-15)

**Note:** Version bump only for package imagetools-core

# 0.1.0-next.0 (2021-03-15)

### Bug Fixes

- blur directive argument parsing
  ([e48448d](https://github.com/JonasKruckenberg/vite-imagetools/commit/e48448db86f2eceb667bd57ce99eefa57506ea3c))
- consolidate functions into main
  ([0772934](https://github.com/JonasKruckenberg/vite-imagetools/commit/0772934bd6306867498c82d1c681a614a3347503))

### Features

- add caching utils
  ([2cc2d90](https://github.com/JonasKruckenberg/vite-imagetools/commit/2cc2d9062184f69c012cab086f76a608a2eb2f1e))
- add util functions
  ([c36d840](https://github.com/JonasKruckenberg/vite-imagetools/commit/c36d840605ae6da20df8903e39009920e863efe9))

### Reverts

- Revert "Publish"
  ([c0186f1](https://github.com/JonasKruckenberg/vite-imagetools/commit/c0186f12c595b6cedf3341a8de018f9a7f48a7c4))
