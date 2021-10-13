import { blur } from './transforms/blur'
import { flatten } from './transforms/flatten'
import { flip } from './transforms/flip'
import { flop } from './transforms/flop'
import { format } from './transforms/format'
import { grayscale } from './transforms/grayscale'
import { hsb } from './transforms/hsb'
import { invert } from './transforms/invert'
import { median } from './transforms/median'
import { normalize } from './transforms/normalize'
import { resize } from './transforms/resize'
import { rotate } from './transforms/rotate'
import { tint } from './transforms/tint'

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
