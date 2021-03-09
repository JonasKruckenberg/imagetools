import { MetaDirective } from "../types";

interface PositionOptions {
    position: PositionValue
}

const positionValues = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    'cover', 'entropy', 'attention'] as const

type PositionValue = typeof positionValues[number]

/**
 * When both `width` and `height` are provided AND the fit is one of `fit` of `cover` or `contain`, 
 * this directive can be used to set the position of the image.
 * 
 * See sharps [resize options](https://sharp.pixelplumbing.com/api-resize#resize) for a detailed explanation of each.
 * 
 * @name Position
 * @category Import Directives
 * @keyword `position`
 * @type _top_ \| _right top_ \| _right_ \| _right bottom_ \| _bottom_ \| _left bottom_ \| _left_ \| _left top_ \|
    _north_ \| _northeast_ \| _east_ \| _southeast_ \| _south_ \| _southwest_ \| _west_ \| _northwest_ \| _center_ \| _centre_ \|
    _cover_ \| _entropy_ \| _attention_
 */
export const position: MetaDirective<PositionOptions, PositionValue> = ({ position }, ctx) => {
    if (!position || !positionValues.includes(position)) return null

    ctx.useParam('position')
    ctx.setMetadata('position', position)

    return position
}