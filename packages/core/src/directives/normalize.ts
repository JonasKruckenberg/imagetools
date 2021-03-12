import { Directive } from "../types";

export interface NormalizeOptions {
    normalize: '' | 'true'
}

export const normalize: Directive<NormalizeOptions> = ({ normalize }, ctx) => {
    if(normalize !== '' && normalize !== 'true') return

    return function normalizeTransform(image) {
        return image.normalize()
    }
}