import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const normalize: ImageTransformFactory<'normalize'> = ({ normalize }) => {
    if (normalize !== '' && normalize !== 'true') return

    return function normalizeTransform(image) {
        setMetadata(image, 'normalize', true)

        return image.normalize()
    }
}