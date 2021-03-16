import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";

export interface InvertOptions {
    invert: '' | 'true'
}

export const invert: Directive<InvertOptions> = ({ invert }, ctx) => {
    if (invert !== '' && invert !== 'true') return

    return function invertTransform(image) {
        setMetadata(image, 'invert', true)

        return image.negate()
    }
}