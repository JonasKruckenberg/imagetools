import { MetaDirective } from "../types"

export const positionValues = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    'entropy', 'attention'] as const

export const positionShorthands = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top']

export type PositionValue = typeof positionValues[number]

export interface PositionOptions {
    position: PositionValue
}

export const position: MetaDirective<PositionOptions, PositionValue> = (config, ctx) => {
    let position: PositionValue | undefined = undefined

    if (config.position && positionValues.includes(config.position)) {
        position = config.position
    } else {
        position = Object.keys(config).find((k: any): k is PositionValue => positionShorthands.includes(k) && config[k] === '')
    }
    if (!position) return

    return position
}
