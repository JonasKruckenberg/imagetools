import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const flop: ImageTransformFactory<'flop'> = ({ flop }) => {
    if (flop !== '' && flop !== 'true') return

    return function flopTransform(image) {
        setMetadata(image, 'flop', true)

        return image.flop()
    }
}