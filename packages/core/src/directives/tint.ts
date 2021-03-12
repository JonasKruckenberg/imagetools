import { Directive } from "../types";

export interface TintOptions {
    tint: string
}

export const tint: Directive<TintOptions> = ({ tint }, ctx) => {
    if (typeof tint !== 'string' || !tint.length) return

    return function tintTransform(image) {
        return image.tint('#' + tint)
    }
}