# Change Log

## 4.0.13

### Patch Changes

- e154d09: fix: revert bundling of imagetools-core

## 4.0.12

### Patch Changes

- 425867f: Bundle imagetools-core

## 4.0.11

### Patch Changes

- dbc8d02: Fix type resolution by re-adding top-level types field
- Updated dependencies [dbc8d02]
  - imagetools-core@3.2.3

## 4.0.10

### Patch Changes

- 92b2fa3: chore(deps): update dependency @types/sharp to ^0.31.0
- 07df0fa: fix: process URLs with no query string
- 80250db: Update package READMEs and metadata.
- d11b927: Let vite create correct paths in build result
- 60890de: fix: add an exports map
- Updated dependencies [92b2fa3]
- Updated dependencies [80250db]
- Updated dependencies [60890de]
  - imagetools-core@3.2.2

## 4.0.9

### Patch Changes

- ca40b8b: chore(deps): update dependency sharp to ^0.31.0
- Updated dependencies [ca40b8b]
  - imagetools-core@3.2.1

## 4.0.8

### Patch Changes

- Updated dependencies [45b35da]
  - imagetools-core@3.2.0

## 4.0.7

### Patch Changes

- Updated dependencies [ea4ab8f]
  - imagetools-core@3.1.1

## 4.0.6

### Patch Changes

- Updated dependencies [6f93aaf]
  - imagetools-core@3.1.0

## 4.0.5

### Patch Changes

- 7efa2dc: Correctly merge directives when `defaultDirectives` is a function.
- cb679f5: fixes the conditional reveal of metadata when using `defaultDirectives`.
- 7efa2dc: Allow directives specified in URLs to override default directives
- b551792: Update to `vite` v3.

## 4.0.4

### Patch Changes

- Updated dependencies [7a75a6f]
  - imagetools-core@3.0.3

## 4.0.3

### Patch Changes

- 725e27b: chore(deps-dev): bump vite from 2.7.2 to 2.7.3
- 64356e6: chore(deps-dev): bump sharp from 2.8.2 to 2.9.3
- Updated dependencies [64356e6]
  - imagetools-core@3.0.2

## 4.0.2

### Patch Changes

- 922975e: chore(deps-dev): bump vite from 2.6.14 to 2.7.1

## 4.0.1

### Patch Changes

- e6ed3a8: re-add cloned image fix that got lost during merging
- e58e2cb: Remove `icc` metadata when `removeMetadata` is set to true.
- Updated dependencies [e58e2cb]
  - imagetools-core@3.0.1

## 4.0.0

### Major Changes

- f6cec96: change `defaultDirectives` from `Record<string,string>` to `URLSearchParams`, to align with in-code interface
  and to allow for multiple entries of _key_ with multiple _values_

### Patch Changes

- fb767da: chore(deps-dev): bump vite from 2.6.7 to 2.6.14
- 1655877: Fix path to typings
- f85ffe8: Bump @rollup/pluginutils
- Updated dependencies [f6cec96]
  - imagetools-core@3.0.0

## 3.9.0

### Minor Changes

- 73955f4: feat: allow override of resolveConfigs

### Patch Changes

- 76e9a4d: fix: clone sharp image in vite plugin to avoid reuse issue

## 3.8.0

### Minor Changes

- dc60a68: Add `image` property on the metadata object.

### Patch Changes

- dc60a68: Update vite to `2.6.7` and rollup to `2.58.0`

## 3.7.0

### Minor Changes

- c70b97e: Add metadata whitelist

### Patch Changes

- Updated dependencies [c70b97e]
  - imagetools-core@2.8.0

## 3.6.8

### Patch Changes

- d1a3058: chore(deps-dev): bump vite from 2.3.2 to 2.3.4

## 3.6.7

### Patch Changes

- 7c485aa: chore(deps-dev): bump vite from 2.3.0 to 2.3.2

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.6](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.5...vite-imagetools@3.6.6) (2021-05-11)

**Note:** Version bump only for package vite-imagetools

## [3.6.5](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.4...vite-imagetools@3.6.5) (2021-05-11)

**Note:** Version bump only for package vite-imagetools

## [3.6.4](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.3...vite-imagetools@3.6.4) (2021-05-11)

**Note:** Version bump only for package vite-imagetools

## [3.6.3](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.2...vite-imagetools@3.6.3) (2021-05-11)

**Note:** Version bump only for package vite-imagetools

## [3.6.2](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.1...vite-imagetools@3.6.2) (2021-05-11)

**Note:** Version bump only for package vite-imagetools

## [3.6.1](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.6.0...vite-imagetools@3.6.1) (2021-05-07)

**Note:** Version bump only for package vite-imagetools

# [3.6.0](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.5.4...vite-imagetools@3.6.0) (2021-05-07)

### Features

- Allow # symbols in src urls
  ([b5beedd](https://github.com/JonasKruckenberg/imagetools/commit/b5beedd3707167aad9302737d1012f35a3f19776))

## [3.5.4](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.5.2...vite-imagetools@3.5.4) (2021-05-07)

**Note:** Version bump only for package vite-imagetools

## [3.5.2](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.5.1...vite-imagetools@3.5.2) (2021-05-03)

**Note:** Version bump only for package vite-imagetools

## [3.5.1](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.5.0...vite-imagetools@3.5.1) (2021-05-03)

### Bug Fixes

- decode URI encoded paths before resolving
  ([36636e5](https://github.com/JonasKruckenberg/imagetools/commit/36636e57d12d846ecd3500deb30d838150a85a2c)), closes
  [#84](https://github.com/JonasKruckenberg/imagetools/issues/84)

# [3.5.0](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.4...vite-imagetools@3.5.0) (2021-04-28)

### Features

- Add default directives ([#81](https://github.com/JonasKruckenberg/imagetools/issues/81))
  ([176fa6d](https://github.com/JonasKruckenberg/imagetools/commit/176fa6d048ad3142e60c75a8253cabd9b28e3a49))

## [3.4.4](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.3...vite-imagetools@3.4.4) (2021-04-28)

**Note:** Version bump only for package vite-imagetools

## [3.4.3](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.2...vite-imagetools@3.4.3) (2021-04-28)

**Note:** Version bump only for package vite-imagetools

## [3.4.2](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.1...vite-imagetools@3.4.2) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))
- **vite-imagetools:** Add a more helpful error message when no images could be generated during dev mode
  ([e62b1bb](https://github.com/JonasKruckenberg/imagetools/commit/e62b1bb6b0b7a0c7c67dbcda1350864847718053))

## [3.4.1](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0...vite-imagetools@3.4.1) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))
- **vite-imagetools:** Add a more helpful error message when no images could be generated during dev mode
  ([e62b1bb](https://github.com/JonasKruckenberg/imagetools/commit/e62b1bb6b0b7a0c7c67dbcda1350864847718053))

# 3.4.0 (2021-04-12)

**Note:** Version bump only for package vite-imagetools

# [3.4.0-next.7](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0-next.6...vite-imagetools@3.4.0-next.7) (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- switch from default to named export
  ([b2f0ca7](https://github.com/JonasKruckenberg/imagetools/commit/b2f0ca7c2a7b50f2e28566cd397e5b3f0b0f55f7))

# [3.4.0-next.6](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0-next.5...vite-imagetools@3.4.0-next.6) (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- switch from default to named export
  ([b2f0ca7](https://github.com/JonasKruckenberg/imagetools/commit/b2f0ca7c2a7b50f2e28566cd397e5b3f0b0f55f7))

# [3.4.0-next.5](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0-next.4...vite-imagetools@3.4.0-next.5) (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- switch from default to named export
  ([b2f0ca7](https://github.com/JonasKruckenberg/imagetools/commit/b2f0ca7c2a7b50f2e28566cd397e5b3f0b0f55f7))

# [3.4.0-next.4](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0-next.3...vite-imagetools@3.4.0-next.4) (2021-04-09)

### Features

- respect vite configuration when generating output code
  ([e4a9c66](https://github.com/JonasKruckenberg/imagetools/commit/e4a9c66f16ff9994ea75b3140e387d4a165bfb9f)), closes
  [#55](https://github.com/JonasKruckenberg/imagetools/issues/55)

# [3.4.0-next.3](https://github.com/JonasKruckenberg/imagetools/compare/vite-imagetools@3.4.0-next.2...vite-imagetools@3.4.0-next.3) (2021-04-06)

### Bug Fixes

- mark force option as deprecated
  ([23b0aef](https://github.com/JonasKruckenberg/imagetools/commit/23b0aef57e363aa314222cc869d2e1f85e29e118))

### Features

- add rollup integration
  ([2fd9ca7](https://github.com/JonasKruckenberg/imagetools/commit/2fd9ca7e1b945d023e9305f0172763fc991bfdb4))

# [3.4.0-next.2](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.4.0-next.1...vite-imagetools@3.4.0-next.2) (2021-04-05)

**Note:** Version bump only for package vite-imagetools

# [3.4.0-next.1](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.4.0-next.0...vite-imagetools@3.4.0-next.1) (2021-03-30)

**Note:** Version bump only for package vite-imagetools

# [3.4.0-next.0](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.3.2-alpha.0...vite-imagetools@3.4.0-next.0) (2021-03-30)

### Bug Fixes

- support nodejs LTS versions
  ([4abccc5](https://github.com/JonasKruckenberg/vite-imagetools/commit/4abccc53700ad55d04dc0c2142b6dc8d69ebf122)),
  closes [#51](https://github.com/JonasKruckenberg/vite-imagetools/issues/51)
- update cache key geneartion to match spec
  ([7f0a0e8](https://github.com/JonasKruckenberg/vite-imagetools/commit/7f0a0e8bf20189e12425ffaed2026120b7b5260d))

### Features

- allow metadata removal to be toggled by option
  ([5d0c781](https://github.com/JonasKruckenberg/vite-imagetools/commit/5d0c781c0a0511725c7d615e97b1e9b0c902009e))

## [3.3.2-alpha.0](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.3.1...vite-imagetools@3.3.2-alpha.0) (2021-03-30)

### Bug Fixes

- support nodejs LTS versions
  ([4abccc5](https://github.com/JonasKruckenberg/vite-imagetools/commit/4abccc53700ad55d04dc0c2142b6dc8d69ebf122)),
  closes [#51](https://github.com/JonasKruckenberg/vite-imagetools/issues/51)

## [3.3.1](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.3.0...vite-imagetools@3.3.1) (2021-03-19)

### Bug Fixes

- image id generation
  ([7ea0839](https://github.com/JonasKruckenberg/vite-imagetools/commit/7ea0839e2e69eb652d2cee01c3f1d8148f7290f1)),
  closes [#34](https://github.com/JonasKruckenberg/vite-imagetools/issues/34)

# [3.3.0](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.6...vite-imagetools@3.3.0) (2021-03-16)

### Features

- change extendDirectives signature
  ([b6ac8b3](https://github.com/JonasKruckenberg/vite-imagetools/commit/b6ac8b34581b84a6d6861a2b7ecc2f22f569e257))
- rework plugin to use new core library
  ([e8e11cf](https://github.com/JonasKruckenberg/vite-imagetools/commit/e8e11cf7b33e920be21cde31183876e6b824b779))

## [3.2.6](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.5...vite-imagetools@3.2.6) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

## [3.2.5](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.4...vite-imagetools@3.2.5) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

## [3.2.4](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.3...vite-imagetools@3.2.4) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

## [3.2.3](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.2...vite-imagetools@3.2.3) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

## [3.2.2](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.1...vite-imagetools@3.2.2) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

## [3.2.1](https://github.com/JonasKruckenberg/vite-imagetools/compare/vite-imagetools@3.2.0...vite-imagetools@3.2.1) (2021-03-15)

**Note:** Version bump only for package vite-imagetools

# 3.2.0 (2021-03-15)

### Bug Fixes

- improve extensibility
  ([61d5a3d](https://github.com/JonasKruckenberg/vite-imagetools/commit/61d5a3d1ed6c0cb2013528b09cbc5b9ee4170ff3))
- reflect new imagetools-core version
  ([f5135b7](https://github.com/JonasKruckenberg/vite-imagetools/commit/f5135b7ecf4341a6192913c47d297b10cd6c6835))
- remove force option
  ([9f04c9c](https://github.com/JonasKruckenberg/vite-imagetools/commit/9f04c9ca0ce779b13b4aa3d13e59548cd15d3eed))

### Features

- add output formats
  ([70cd9cd](https://github.com/JonasKruckenberg/vite-imagetools/commit/70cd9cd54ec227f9fe805cfff2b287baaba413bf))

### Reverts

- Revert "Publish"
  ([c0186f1](https://github.com/JonasKruckenberg/vite-imagetools/commit/c0186f12c595b6cedf3341a8de018f9a7f48a7c4))
