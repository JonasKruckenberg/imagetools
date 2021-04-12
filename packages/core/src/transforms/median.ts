import { TransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export interface MedianOptions {
    median: string
}

export const median: TransformFactory<MedianOptions> = (config, ctx) => {
    const median = config.median ? parseInt(config.median) : undefined

    if (!median) return

    return function medianTransform(image) {
        setMetadata(image, 'median', median)

        return image.median(median)
    }
}