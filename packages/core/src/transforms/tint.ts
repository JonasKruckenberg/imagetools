import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const tint: ImageTransformFactory<'tint'> = ({ tint }) => {
    if (typeof tint !== 'string' || !tint.length) return

    return function tintTransform(image) {
        setMetadata(image, 'tint', '#' + tint)

        return image.tint('#' + tint)
    }
}