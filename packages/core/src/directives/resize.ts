import { Directive } from "../types";
import { fit as getFit } from './fit'
import { position as getPosition } from './position'
import { kernel as getKernel } from './kernel'
import { background as getBackground } from './background'

export interface ResizeOptions {
    width: string
    w: string
    height: string
    h: string
}

export const resize: Directive<ResizeOptions> = (config, ctx) => {

    const width = config.width ? parseInt(config.width) : undefined
    const w = config.w ? parseInt(config.w) : undefined
    const height = config.height ? parseInt(config.height) : undefined
    const h = config.h ? parseInt(config.h) : undefined

    if (!width && !w && !height && !h) return

    const fit = getFit(config, ctx)
    const position = getPosition(config, ctx)
    const kernel = getKernel(config, ctx)
    const background = getBackground(config, ctx)

    return function resizeTransform(image) {
        return image.resize({
            width: width || w,
            height: height || h,
            fit,
            position,
            kernel,
            background
        })
    }
}