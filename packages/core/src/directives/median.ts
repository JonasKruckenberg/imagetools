import { Directive } from "../types";

export interface MedianOptions {
    median: string
}

export const median: Directive<MedianOptions> = (config, ctx) => {
    const median = config.median ? parseInt(config.median) : undefined

    if (!median) return

    return function medianTransform(image) {
        return image.median(median)
    }
}