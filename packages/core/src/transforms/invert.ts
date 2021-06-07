import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const invert: ImageTransformFactory<'invert'> = ({ invert }) => {
    if (invert !== '' && invert !== 'true') return

    return function invertTransform(image) {
        setMetadata(image, 'invert', true)

        return image.negate()
    }
}