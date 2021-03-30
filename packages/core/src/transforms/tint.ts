import { TransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export interface TintOptions {
    tint: string
}

export const tint: TransformFactory<TintOptions> = ({ tint }, ctx) => {
    if (typeof tint !== 'string' || !tint.length) return

    return function tintTransform(image) {
        setMetadata(image, 'tint', '#' + tint)

        return image.tint('#' + tint)
    }
}