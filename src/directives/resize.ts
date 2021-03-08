import { Directive } from "../types"
import { background as getBackground } from './background'
import { fit as getFit } from './fit'
import { position as getPosition } from './position'
import { kernel as getKernel } from './kernel'

interface ResizeOptions {
    height: string
    h: string
    width: string
    w: string
    background: string
}

export const resize: Directive<ResizeOptions> = (opts, { useParam, setMetadata }) => {
    const width = parseInt(opts.width || opts.w) || null
    const height = parseInt(opts.height || opts.h) || null

    if (!width && !height) return null

    if (width) {
        useParam('width')
        setMetadata('width', width)
    }

    if (height) {
        useParam('height')
        setMetadata('height', height)
    }

    const background = getBackground(opts,{ useParam, setMetadata })
    const fit = getFit(opts,{ useParam, setMetadata })
    const position = getPosition(opts,{ useParam, setMetadata })
    const kernel = getKernel(opts, { useParam, setMetadata })

    return function resizeTransform(image) {
        return image.resize({
            width,
            height,
            background,
            fit,
            position,
            kernel
        })
    }
}