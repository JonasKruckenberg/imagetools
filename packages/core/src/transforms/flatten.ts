import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";
import { getBackground } from './background'

export const flatten: ImageTransformFactory<'flatten'> = ({ flatten, ...target }) => {
    if (flatten !== '' && flatten !== 'true') return

    const background = getBackground(target)

    return function flattenTransform(image) {
        setMetadata(image, 'flatten', true)
        setMetadata(image, 'background', background)

        return image.flatten({ background })
    }
}