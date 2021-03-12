import { Directive } from "../types";

export interface FlopOptions {
    flop: '' | 'true'
}

export const flop: Directive<FlopOptions> = ({ flop }, ctx) => {
    if (flop !== '' && flop !== 'true') return

    return function flipTransform(image) {
        return image.flop()
    }
}