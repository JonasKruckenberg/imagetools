import { TransformOption } from '../types.js'
import { getMetadata, setMetadata } from '../lib/metadata.js'

export interface EffortOptions {
  effort: string
}

const FORMAT_TO_EFFORT_RANGE: Record<string, [number, number]> = {
  png: [1, 10],
  webp: [0, 6],
  avif: [0, 9],
  heif: [0, 9],
  heic: [0, 9],
  gif: [1, 10]
}

function parseEffort(effort: string, format: string) {
  if (effort === 'min') {
    return FORMAT_TO_EFFORT_RANGE[format]?.[0]
  } else if (effort === 'max') {
    return FORMAT_TO_EFFORT_RANGE[format]?.[1]
  }
  return parseInt(effort)
}

export const getEffort: TransformOption<EffortOptions, number> = ({ effort: _effort }, image) => {
  if (!_effort) return

  const format = (getMetadata(image, 'format') ?? '') as string
  const effort = parseEffort(_effort, format)
  if (!Number.isInteger(effort)) return

  setMetadata(image, 'effort', effort)

  return effort
}
