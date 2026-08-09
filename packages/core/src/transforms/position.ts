import type { TransformOption } from '../types.js'
import { positionValues, positionShorthands } from '../lib/values.js'
import { formatExpected, invalidDirectiveValue, orFalseToDisable } from '../lib/parse.js'

export { positionValues, positionShorthands } from '../lib/values.js'

export type PositionValue = (typeof positionValues)[number]

export interface PositionOptions {
  position: PositionValue | 'false'
}

function parsePosition(position: string | undefined): PositionValue | undefined {
  if (position === undefined || position === '' || position === 'false') return undefined
  if (positionValues.includes(position as PositionValue)) return position as PositionValue
  throw invalidDirectiveValue('position', position, orFalseToDisable(`one of ${formatExpected(positionValues)}`))
}

/**
 * Resolves the `position` value from the parsed directives: the `position`
 * keyword, or a bare shorthand directive such as `?top`. Validates and throws
 * for invalid values. Returns `undefined` when no position is given, and
 * records the applied value on `state.transforms`.
 */
export const getPosition: TransformOption<PositionOptions, PositionValue> = (config, state) => {
  const position =
    parsePosition(config.position) ??
    Object.keys(config).find((k: string): k is PositionValue => positionShorthands.includes(k) && config[k] === '')
  if (position === undefined) return

  state.transforms.position = position
  return position
}
