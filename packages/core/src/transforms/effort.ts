import { TransformOption } from '../types.js'
import { setMetadata } from '../lib/metadata.js'

export interface EffortOptions {
  effort: string
}

export const getEffort: TransformOption<EffortOptions, number> = ({ effort: _effort }, image) => {
  const effort = _effort && parseInt(_effort)

  if (!effort) return

  setMetadata(image, 'effort', effort)

  return effort
}
