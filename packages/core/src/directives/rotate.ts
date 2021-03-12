import { Directive } from "../types";
import { background as getBackground } from './background'

export interface RotateOptions {
    rotate: string
}

export const rotate: Directive<RotateOptions> = (config, ctx) => {
    const rotate = config.rotate && parseInt(config.rotate)

    if (!rotate) return

    const background = getBackground(config, ctx)

    return function rotateTransform(image) {
        return image.rotate(rotate, { background })
    }
}