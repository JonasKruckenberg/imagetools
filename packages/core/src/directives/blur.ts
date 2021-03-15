import { Directive } from "../types";

export interface BlurOptions {
    blur: string
}

export const blur: Directive<BlurOptions> = (config, ctx) => {
    let blur: number | boolean | undefined = undefined

    blur = config.blur ? parseFloat(config.blur) : undefined
    blur ||= config.blur === 'true'
    blur ||= config.blur === ''

    if (!blur) return

    return function blurTransform(image) {
        return image.blur(blur)
    }
}