import { getMetadata } from "../lib/metadata";
import { ImageTransformFactory } from '../types'
import { AFTER_EMIT } from "../util";

export const srcsetOutput: ImageTransformFactory = (target) => {
    if ('srcset' in target) {
        return (image) => [` ${getMetadata(image, 'src')} ${getMetadata(image, 'width')}w`, image]
    }
}
srcsetOutput[AFTER_EMIT] = true
