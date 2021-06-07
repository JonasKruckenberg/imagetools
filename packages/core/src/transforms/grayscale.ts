import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const grayscale: ImageTransformFactory<'grayscale'> = function ({ grayscale }) {
    if (grayscale !== '' && grayscale !== 'true') return

    return function grayscaleTransform(image) {
        setMetadata(image, 'grayscale', true)

        return image.grayscale()
    }
}