import { TransformFactory } from "../types";
import { getFit } from './fit'
import { getPosition } from './position'
import { getKernel } from './kernel'
import { getBackground } from './background'
import { setMetadata, getMetadata } from "../lib/metadata";
import { Sharp } from "sharp";

export interface ResizeOptions {
    width: string
    w: string
    height: string
    h: string
    aspect: string
}

function parseAspect(aspect?: string) {
    if (!aspect || !aspect.split) {
        return undefined;
    }

    const [width, height] = aspect.split(':')

    if (!width || !height) {
        return undefined
    }

    const widthInt = parseInt(width)
    const heightInt = parseInt(height)

    return widthInt && heightInt && widthInt > 0 && heightInt > 0
        ? widthInt / heightInt
        : undefined
}

export const resize: TransformFactory<ResizeOptions> = (config, ctx) => {

    const width = config.width
        ? parseInt(config.width)
        : config.w
            ? parseInt(config.w)
            : undefined
    const height = config.height
        ? parseInt(config.height)
        : config.h
            ? parseInt(config.h)
            : undefined
    const aspect = width && height
        ? width / height
        : parseAspect(config.aspect)

    if (!width && !height && !aspect) return

    return function resizeTransform(image) {
        let finalWidth = width
        let finalHeight = height

        const w = getMetadata(image, 'width')
        const h = getMetadata(image, 'height')

        const metaAspect = w / h

        if (width && height) {
            /* both dimensions were provided, aspect is ignored and no calculations are needed */
        }
        else if (!height && !width) {
            /* only aspect was given, need to calculate which dimension to crop */
            const useWidth = aspect! > metaAspect

            finalHeight = useWidth ? Math.round(w / aspect!) : h
            finalWidth = useWidth ? w : Math.round(h / aspect!)
        } else if (!height) {
            /* only width was provided, need to calculate height */
            finalHeight = width! / (aspect || metaAspect)
            finalWidth = width
        } else {
            /* only height was provided, need to calculate width */
            finalHeight = height
            finalWidth = height * (aspect || metaAspect)
        }

        setMetadata(image, 'height', finalHeight)
        setMetadata(image, 'width', finalWidth)

        return image.resize({
            width: finalWidth,
            height: finalHeight,
            fit: getFit(config, image),
            position: getPosition(config, image),
            kernel: getKernel(config, image),
            background: getBackground(config, image)
        })
    }
}