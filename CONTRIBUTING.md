# Contributing

Hey! Thanks for considering to contribute to this project! We have some tips and tricks to get you started:

## Roadmap

We have a [project roadmap](https://github.com/JonasKruckenberg/imagetools/projects/1)! This includes all features that
are being worked or those that are planned. If you feel like contributing, have a look! Feedback to all planned features
is also highly welcome!

## Project Setup

This repository is a monorepo using pnpm workspaces and [changesets](https://github.com/atlassian/changesets).<br> Since
we use `git-lfs` to store the image snapshots, you need to have it installed in order to clone this repository. You can
download it here: https://git-lfs.github.com. This is only needed for running tests.

The folder structure is a following:

```
┠─ docs:
┃   Documentation that is common to all packages.
┃
┠─ examples:
┃   Example projects showing the real-word usage of imagetools.
┃
┖─ packages
    ┠─ core:
    ┃   Holds all transforms and common utility functions needed for builtools integrations.
    ┃
    ┖─ vite:
        The integration with the vite frontend builtool.
```

## Running Tests

Running `pnpm test`from the top level runs all tests for all packages, if your only interested in running tests for a
single package cd into that directory and run `pnpm test` there. You will need git-lfs to clone the repo with all test
fixtures (see [project setup](#project-setup) for instructions on how to install git-lfs)

## Pull Request Guidelines

- All pull requests should be made against the `main` branch.

- Make sure tests pass!

- Commit messages SHOULD follow the [conventional commits style](https://www.conventionalcommits.org). This helps
  generating changelogs and ensuring proper versioning.

- PRs that should result in a new release to npm MUST include a changeset, see
  [adding a changeset](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md) for details.

- When adding transforms,

  - does your use case absolutely require a new transform to be added or can it be archived some other way?

  - make sure the functions don't have any side-effects and don't keep state between invocations.

  - add a section to the specification explaining you transform

## Integrations

Imagetools is written to be easily adaptable to different buildtools and environment, here are a few tips to get you
started:

- Imagetools-core exposes commonly used utility funtions

To make your life easier imagetools-core provides utility functions for the common tasks like generating cache keys,
loading images etc. Have a look at the [api docs]()!

- Use buildtool specific systems

Users expect their buildtools output to be consistent, so you should always choose the system provided by the builtools
rather than building your own. This includes warnings (e.g. rollup and vite have the `this.warn` function) and caching.

- Avoid caching on disk

Images are big in comparison to other assets in a website, so you should be very careful when caching images on disk
since the cache will - most likely - quickly baloon in size and no one likes that! Since transformations are
deterministic (meaning they produce the same image given the same config) you should leverage the browsers or builtools
cache whenever possible.

- Link to this repository

Whenever you build an something with imagetools-core, make sure to link back to this repository. This will allow your
users to read the docs provided by this repo. If your integration is popular or for a popular buildtool you can also ask
to have your package moven into this monorepo, so your code stays maintained.

- Reexport the directives when possible

`vite-imagetools` re-exports all built-in directives, so users can create their own directives using the builtins as
building blocks. You should - whenever possible - also do the same so users can profit from the extensible nature of
imagetools.
