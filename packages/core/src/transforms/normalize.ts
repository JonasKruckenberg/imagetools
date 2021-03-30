import { TransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export interface NormalizeOptions {
    normalize: '' | 'true'
}

export const normalize: TransformFactory<NormalizeOptions> = ({ normalize }, ctx) => {
    if (normalize !== '' && normalize !== 'true') return

    return function normalizeTransform(image) {
        setMetadata(image, 'normalize', true)

        return image.normalize()
    }
}