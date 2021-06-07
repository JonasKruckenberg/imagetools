import { GetParam } from "../types"

export const positionValues = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    'entropy', 'attention'] as const

export const positionShorthands = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top']

export type PositionValue = typeof positionValues[number]

export const getPosition: GetParam<'position' | PositionValue, PositionValue> = ({ position, ...rest }) => {
    position ||= Object.keys(rest).find((k): k is PositionValue => positionShorthands.includes(k as PositionValue))

    if (!position || !positionValues.includes(position as PositionValue)) return

    return position as PositionValue
}
