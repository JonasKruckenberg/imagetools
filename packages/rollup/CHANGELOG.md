# Change Log

## 3.0.3

### Patch Changes

- ef9f2dd: chore(deps-dev): bump rollup from 2.61.0 to 2.61.1

## 3.0.2

### Patch Changes

- eb449f1: chore(deps-dev): bump rollup from 2.59.0 to 2.61.0

## 3.0.1

### Patch Changes

- e58e2cb: Remove `icc` metadata when `removeMetadata` is set to true.
- Updated dependencies [e58e2cb]
  - imagetools-core@3.0.1

## 3.0.0

### Major Changes

- f6cec96: change `defaultDirectives` from `Record<string,string>` to `URLSearchParams`, to align with in-code interface
  and to allow for multiple entries of _key_ with multiple _values_

### Patch Changes

- 1655877: Fix path to typings
- f85ffe8: Bump @rollup/pluginutils
- 0f218f0: Bump rollup
- Updated dependencies [f6cec96]
  - imagetools-core@3.0.0

## 2.5.0

### Minor Changes

- 73955f4: feat: allow override of resolveConfigs

## 2.4.0

### Minor Changes

- dc60a68: Add `image` property on the metadata object.

### Patch Changes

- dc60a68: Update vite to `2.6.7` and rollup to `2.58.0`

## 2.3.0

### Minor Changes

- c70b97e: Add metadata whitelist

### Patch Changes

- Updated dependencies [c70b97e]
  - imagetools-core@2.8.0

## 2.2.8

### Patch Changes

- 2f60cf2: chore(deps-dev): bump rollup from 2.49.0 to 2.50.6
- Updated dependencies [0ceabff]
  - imagetools-core@2.7.6

## 2.2.7

### Patch Changes

- eb444d4: chore(deps-dev): bump rollup from 2.47.0 to 2.49.0

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.6](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.5...rollup-plugin-imagetools@2.2.6) (2021-05-11)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.2.5](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.4...rollup-plugin-imagetools@2.2.5) (2021-05-11)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.2.4](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.3...rollup-plugin-imagetools@2.2.4) (2021-05-11)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.2.3](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.2...rollup-plugin-imagetools@2.2.3) (2021-05-11)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.2.2](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.1...rollup-plugin-imagetools@2.2.2) (2021-05-11)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.2.1](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.2.0...rollup-plugin-imagetools@2.2.1) (2021-05-07)

**Note:** Version bump only for package rollup-plugin-imagetools

# [2.2.0](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.1.4...rollup-plugin-imagetools@2.2.0) (2021-05-07)

### Features

- Allow # symbols in src urls
  ([b5beedd](https://github.com/JonasKruckenberg/imagetools/commit/b5beedd3707167aad9302737d1012f35a3f19776))

## [2.1.4](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.1.2...rollup-plugin-imagetools@2.1.4) (2021-05-07)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.1.2](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.1.1...rollup-plugin-imagetools@2.1.2) (2021-05-03)

### Bug Fixes

- **rollup-plugin-imgagetools:** fix relative imports
  ([f19c34c](https://github.com/JonasKruckenberg/imagetools/commit/f19c34c35418b4ef0ae1356a426e904c1cf64b0e))
- decode URI encoded paths before resolving
  ([36636e5](https://github.com/JonasKruckenberg/imagetools/commit/36636e57d12d846ecd3500deb30d838150a85a2c)), closes
  [#84](https://github.com/JonasKruckenberg/imagetools/issues/84)
- **rollup-plugin-imagetools:** update imagetool-core version
  ([3cd3cff](https://github.com/JonasKruckenberg/imagetools/commit/3cd3cffc1159cabc087c50cc28617915e040577e))

## [2.1.1](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.1.0...rollup-plugin-imagetools@2.1.1) (2021-05-03)

### Bug Fixes

- decode URI encoded paths before resolving
  ([36636e5](https://github.com/JonasKruckenberg/imagetools/commit/36636e57d12d846ecd3500deb30d838150a85a2c)), closes
  [#84](https://github.com/JonasKruckenberg/imagetools/issues/84)
- **rollup-plugin-imagetools:** update imagetool-core version
  ([3cd3cff](https://github.com/JonasKruckenberg/imagetools/commit/3cd3cffc1159cabc087c50cc28617915e040577e))

# 2.1.0 (2021-04-28)

### Features

- Add default directives ([#81](https://github.com/JonasKruckenberg/imagetools/issues/81))
  ([176fa6d](https://github.com/JonasKruckenberg/imagetools/commit/176fa6d048ad3142e60c75a8253cabd9b28e3a49))

## [2.0.3](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.0.2...rollup-plugin-imagetools@2.0.3) (2021-04-28)

**Note:** Version bump only for package rollup-plugin-imagetools

## [2.0.2](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@2.0.1...rollup-plugin-imagetools@2.0.2) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))

## [2.0.1](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@0.0.0...rollup-plugin-imagetools@2.0.1) (2021-04-28)

### Bug Fixes

- exclude test files from generated types
  ([a86d29c](https://github.com/JonasKruckenberg/imagetools/commit/a86d29c0b070b57860878fe80627d402eea82eaf))

# [2.0.0](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@0.0.0...rollup-plugin-imagetools@2.0.0) (2021-04-12)

**Note:** Version bump only for package rollup-plugin-imagetools

# 0.0.0 (2021-04-12)

**Note:** Version bump only for package rollup-plugin-imagetools

# [0.0.0-next.4](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@0.0.0-next.3...rollup-plugin-imagetools@0.0.0-next.4) (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- **rollup-plugin-imagetools:** correctly resolve absolute paths
  ([f612e6a](https://github.com/JonasKruckenberg/imagetools/commit/f612e6a8d5dcf68c39040f446d07e9c0884f6ac9))

# [0.0.0-next.3](https://github.com/JonasKruckenberg/imagetools/compare/rollup-plugin-imagetools@0.0.0-next.2...rollup-plugin-imagetools@0.0.0-next.3) (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- **rollup-plugin-imagetools:** correctly resolve absolute paths
  ([f612e6a](https://github.com/JonasKruckenberg/imagetools/commit/f612e6a8d5dcf68c39040f446d07e9c0884f6ac9))

# 0.0.0-next.2 (2021-04-11)

### Bug Fixes

- import types from the right file
  ([92fbe14](https://github.com/JonasKruckenberg/imagetools/commit/92fbe14168c1198a6c8d0e42ce1483cfad927294))
- **rollup-plugin-imagetools:** correctly resolve absolute paths
  ([f612e6a](https://github.com/JonasKruckenberg/imagetools/commit/f612e6a8d5dcf68c39040f446d07e9c0884f6ac9))

# 0.0.0-next.1 (2021-04-06)

### Bug Fixes

- correctly replace image references in chunks
  ([bdd9b6f](https://github.com/JonasKruckenberg/imagetools/commit/bdd9b6f278db06a840bab63949ff484edb3686a8))

### Features

- add rollup integration
  ([2fd9ca7](https://github.com/JonasKruckenberg/imagetools/commit/2fd9ca7e1b945d023e9305f0172763fc991bfdb4))
