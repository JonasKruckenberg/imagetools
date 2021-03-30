import { Directive } from "../types";
import { getFit } from './fit'
import { getPosition } from './position'
import { getKernel } from './kernel'
import { getBackground } from './background'
import { setMetadata, getMetadata } from "../lib/metadata";

export interface ResizeOptions {
    width: string
    w: string
    height: string
    h: string
}

export const resize: Directive<ResizeOptions> = (config, ctx) => {

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

    if (!width && !height) return

    return function resizeTransform(image) {

        if (!height) {
            const w = getMetadata(image, 'width')
            const h = getMetadata(image, 'height')
            setMetadata(image, 'height', Math.round((width! / w) * h))
            setMetadata(image, 'width', width)
        }

        if (!width) {
            const w = getMetadata(image, 'width')
            const h = getMetadata(image, 'height')
            setMetadata(image, 'width', Math.round((height! / h) * w))
            setMetadata(image, 'height', height)
        }

        return image.resize({
            width: width,
            height: height,
            fit: getFit(config, image),
            position: getPosition(config, image),
            kernel: getKernel(config, image),
            background: getBackground(config, image)
        })
    }
}