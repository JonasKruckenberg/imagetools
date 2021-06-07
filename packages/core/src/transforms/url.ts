import { getMetadata } from "../lib/metadata";
import { ImageTransformFactory } from '../types'
import { AFTER_EMIT } from "../util";

export const urlOutput: ImageTransformFactory = () => {
    return function urlOutputTransform(image) {        
        console.log('yes');
        
        return [getMetadata(image, 'src'), image]
    }
}
urlOutput[AFTER_EMIT] = true
