import { Directive } from "../types";

export interface GrayscaleOptions {
    grayscale: '' | 'true'
}

export const grayscale: Directive<GrayscaleOptions> = ({ grayscale }, ctx) => {
    if (grayscale !== '' && grayscale !== 'true') return

    return function grayscaleTransform(image) {
        return image.grayscale()
    }
}