import { Directive } from "../types";

export interface FlipOptions {
    flip: '' | 'true'
}

export const flip: Directive<FlipOptions> = ({ flip }, ctx) => {
    if (flip !== '' && flip !== 'true') return

    return function flipTransform(image) {
        return image.flip()
    }
}