import { Directive } from "../types";
import { background as getBackground } from './background'

export interface FlattenOptions {
    flatten: '' | 'true'
}

export const flatten: Directive<FlattenOptions> = (config, ctx) => {
    if (config.flatten !== '' && config.flatten !== 'true') return

    const background = getBackground(config, ctx)

    return function flattenTransform(image) {
        return image.flatten({
            background
        })
    }
}