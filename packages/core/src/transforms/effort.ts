import type { TransformOption } from '../types.js'
import { orFalseToDisable, parseIntegerDirective } from '../lib/parse.js'

export interface EffortOptions {
  effort: string
}

const FORMAT_TO_EFFORT_RANGE: Record<string, [number, number]> = {
  avif: [0, 9],
  gif: [1, 10],
  heif: [0, 9],
  jxl: [3, 9],
  png: [1, 10],
  webp: [0, 6]
}

function parseEffort(effort: string | undefined, format: string): number | undefined {
  if (effort === undefined || effort === '') return undefined
  if (effort === 'min') return FORMAT_TO_EFFORT_RANGE[format]?.[0]
  if (effort === 'max') return FORMAT_TO_EFFORT_RANGE[format]?.[1]
  return parseIntegerDirective('effort', effort, orFalseToDisable('"min", "max" or an integer'))
}

/**
 * Resolves the `effort` value from the parsed directives. `"min"` and `"max"`
 * map to the extremes of the range for the target format recorded on `state`,
 * and integers pass through. Throws for invalid values; range validation is
 * left to sharp. Returns `undefined` when the directive is absent, and records
 * the applied value on `state.transforms`.
 */
export const getEffort: TransformOption<EffortOptions, number> = ({ effort: effortDirective }, state) => {
  const effort = parseEffort(effortDirective, state.transforms.format ?? '')
  if (!Number.isInteger(effort)) return

  state.transforms.effort = effort
  return effort
}
