import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";

export interface GrayscaleOptions {
    grayscale: '' | 'true'
}

export const grayscale: Directive<GrayscaleOptions> = ({ grayscale }, ctx) => {
    if (grayscale !== '' && grayscale !== 'true') return

    return function grayscaleTransform(image) {
        setMetadata(image, 'grayscale', true)

        return image.grayscale()
    }
}