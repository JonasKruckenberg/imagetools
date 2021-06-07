import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";
import { getBackground } from './background'

export const rotate: ImageTransformFactory<'rotate'> = ({ rotate, ...rest }) => {
    let _rotate = parseInt(rotate || '')

    if (!rotate) return

    const background = getBackground(rest)

    return function rotateTransform(image) {
        setMetadata(image, 'rotate', _rotate)
 
        return image.rotate(_rotate, { background })
    }
}