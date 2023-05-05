import { blur } from './transforms/blur.js'
import { flatten } from './transforms/flatten.js'
import { flip } from './transforms/flip.js'
import { flop } from './transforms/flop.js'
import { format } from './transforms/format.js'
import { grayscale } from './transforms/grayscale.js'
import { hsb } from './transforms/hsb.js'
import { invert } from './transforms/invert.js'
import { median } from './transforms/median.js'
import { normalize } from './transforms/normalize.js'
import { resize } from './transforms/resize.js'
import { rotate } from './transforms/rotate.js'
import { tint } from './transforms/tint.js'

export const builtins = [
  blur,
  flatten,
  flip,
  flop,
  format,
  grayscale,
  hsb,
  invert,
  median,
  normalize,
  resize,
  rotate,
  tint
]
