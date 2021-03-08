import { DirectiveContext, DirectiveOptions } from "../types";

export const position = ({ position }: DirectiveOptions, ctx: DirectiveContext) => {
    if (!position || !positionValues.includes(position)) return null

    ctx.useParam('position')
    ctx.setMetadata('position', position)

    return position
}

const positionValues = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    'cover', 'entropy', 'attention']