import { Directive } from "../types";
import { setMetadata } from "../lib/metadata";

export interface FlipOptions {
    flip: '' | 'true'
}

export const flip: Directive<FlipOptions> = ({ flip }, ctx) => {
    if (flip !== '' && flip !== 'true') return

    return function flipTransform(image) {
        setMetadata(image, 'flip', true)

        return image.flip()
    }
}