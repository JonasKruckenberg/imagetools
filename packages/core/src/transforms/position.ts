import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

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

export type PositionValue = (typeof positionValues)[number]

export interface PositionOptions {
  position: PositionValue
}

export const getPosition: TransformOption<PositionOptions, PositionValue> = (config, image) => {
  let position: PositionValue | undefined = undefined

  if (config.position && positionValues.includes(config.position)) {
    position = config.position
  } else {
    position = Object.keys(config).find(
      (k: string): k is PositionValue => positionShorthands.includes(k) && config[k] === ''
    )
  }
  if (!position) return

  image[METADATA].position = position

  return position
}
