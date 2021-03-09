import { MetaDirective } from "../types";

interface PositionOptions {
    position: PositionValue
}

export const positionValues = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    'cover', 'entropy', 'attention'] as const

export type PositionValue = typeof positionValues[number]

export const position: MetaDirective<PositionOptions, PositionValue> = ({ position }, ctx) => {
    if (!position || !positionValues.includes(position)) return null

    ctx.useParam('position')
    ctx.setMetadata('position', position)

    return position
}