import { Directive } from "../types";

export interface InvertOptions {
    invert: '' | 'true'
}

export const invert: Directive<InvertOptions> = ({ invert }, ctx) => {
    if (invert !== '' && invert !== 'true') return

    return function invertTransform(image) {
        return image.negate()
    }
}