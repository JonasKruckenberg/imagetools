import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const median: ImageTransformFactory<'median'> = ({ median }) => {
    let _median = parseInt(median || '')

    if (!median) return

    return function medianTransform(image) {
        setMetadata(image, 'median', _median)

        return image.median(_median)
    }
}