import { getMetadata } from "../lib/metadata";
import { TransformFactory } from "../types";

export interface LqipOptions {
    lqip: string
}

export const lqip: TransformFactory<LqipOptions> = (config, ctx) => {
    const width = Math.log(1 + parseInt(config.lqip || '')) * 10
    const quality = clamp(Math.log(1 + parseInt(config.lqip || '')) * 10, 0, 100)

    if(!width || !quality) return

    return function lqipTransform(image) {
        const format = getMetadata(image, 'format') // needed for the quality directive

        console.log(width,quality);

        return image
            .toFormat(format,{ quality: Math.floor(quality) })
            .resize({ width: Math.floor(width) })
    }
}

function clamp(num: number, min: number, max: number) {
    const t = num < min ? min : num
    return t > max ? max : t
}