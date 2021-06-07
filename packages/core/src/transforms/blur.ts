import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const blur: ImageTransformFactory<'blur'> = ({ blur }) => {
    let _blur = parseFloat(blur || '') || blur === 'true' || blur === ''

    if (!_blur) return

    return function blurTransform(image) {
        setMetadata(image, 'blur', _blur)
        
        return image.blur(_blur)
    }
}