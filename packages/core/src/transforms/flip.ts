import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const flip: ImageTransformFactory<'flip'> = ({ flip }) => {
    if (flip !== '' && flip !== 'true') return

    return function flipTransform(image) {
        setMetadata(image, 'flip', true)

        return image.flip()
    }
}