/**
 * Values accepted by the `fit`, `kernel`, `position` and `format` transforms.
 *
 * These live in a module with no imports so the transform implementations and
 * `types.ts` can all reference them without creating a circular dependency.
 */

/** Values accepted by the `fit` transform. */
export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

/** Values accepted by the `kernel` transform. */
export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

/**
 * Values accepted by the `format` transform. These are the formats sharp's
 * `toFormat` accepts, including its runtime aliases (`jpe`, `jpg`, `tif`,
 * `heic`) and tile/dzi formats.
 */
export const formatValues = [
  'heic',
  'heif',
  'avif',
  'jpeg',
  'jpg',
  'jpe',
  'tile',
  'dz',
  'png',
  'raw',
  'tiff',
  'tif',
  'webp',
  'gif',
  'jp2',
  'jpx',
  'j2k',
  'j2c',
  'jxl'
] as const

/** Values accepted by the `position` transform. */
export const positionValues = [
  'top',
  'right top',
  'right',
  'right bottom',
  'bottom',
  'left bottom',
  'left',
  'left top',
  'north',
  'northeast',
  'east',
  'southeast',
  'south',
  'southwest',
  'west',
  'northwest',
  'center',
  'centre',
  'entropy',
  'attention'
] as const

/** Position values that can also be given as a bare directive, e.g. `?top`. */
export const positionShorthands = [
  'top',
  'right top',
  'right',
  'right bottom',
  'bottom',
  'left bottom',
  'left',
  'left top'
]
