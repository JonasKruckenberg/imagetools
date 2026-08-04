import type { TransformOption } from '../types.js'

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

function parseEffort(effort: string, format: string) {
  if (effort === 'min') {
    return FORMAT_TO_EFFORT_RANGE[format]?.[0]
  } else if (effort === 'max') {
    return FORMAT_TO_EFFORT_RANGE[format]?.[1]
  }
  return parseInt(effort)
}

export const getEffort: TransformOption<EffortOptions, number> = ({ effort: _effort }, state) => {
  if (!_effort) return

  const format = state.transforms.format ?? ''
  const effort = parseEffort(_effort, format)
  if (!Number.isInteger(effort)) return

  state.transforms.effort = effort
  return effort
}
