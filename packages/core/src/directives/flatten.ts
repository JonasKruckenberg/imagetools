import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";
import { getBackground } from './background'

export interface FlattenOptions {
    flatten: '' | 'true'
}

export const flatten: Directive<FlattenOptions> = (config, ctx) => {
    if (config.flatten !== '' && config.flatten !== 'true') return

    return function flattenTransform(image) {
        setMetadata(image, 'flatten', true)

        return image.flatten({
            background: getBackground(config, image)
        })
    }
}