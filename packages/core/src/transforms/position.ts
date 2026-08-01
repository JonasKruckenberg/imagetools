import type { TransformOption } from '../types.js'
import { positionValues, positionShorthands } from '../lib/values.js'

export { positionValues, positionShorthands } from '../lib/values.js'

export type PositionValue = (typeof positionValues)[number]

export interface PositionOptions {
  position: PositionValue
}

export const getPosition: TransformOption<PositionOptions, PositionValue> = (config, state) => {
  let position: PositionValue | undefined

  if (config.position && positionValues.includes(config.position)) {
    position = config.position
  } else {
    position = Object.keys(config).find(
      (k: string): k is PositionValue => positionShorthands.includes(k) && config[k] === ''
    )
  }
  if (!position) return

  state.transforms.position = position
  return position
}
