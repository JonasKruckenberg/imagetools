import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";

export interface FlopOptions {
    flop: '' | 'true'
}

export const flop: Directive<FlopOptions> = ({ flop }, ctx) => {
    if (flop !== '' && flop !== 'true') return

    return function flopTransform(image) {
        setMetadata(image, 'flop', true)

        return image.flop()
    }
}