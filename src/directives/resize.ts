import { Directive } from "../types"
import { background as getBackground } from './background'
import { fit as getFit, FitValue } from './fit'
import { position as getPosition,PositionValue } from './position'
import { kernel as getKernel, KernelValue } from './kernel'

interface ResizeOptions {
    height: string
    h: string
    width: string
    w: string
}

export const resize: Directive<ResizeOptions> = (opts, { useParam, setMetadata }) => {
    const width = parseInt(opts.width || opts.w || '')
    const height = parseInt(opts.height || opts.h || '')

    if (!width && !height) return null

    if (width) {
        useParam('width')
        setMetadata('width', width)
    }

    if (height) {
        useParam('height')
        setMetadata('height', height)
    }

    const background = getBackground(opts,{ useParam, setMetadata }) || undefined
    const fit = getFit(opts,{ useParam, setMetadata }) || undefined
    const position = getPosition(opts,{ useParam, setMetadata }) || undefined
    const kernel = getKernel(opts, { useParam, setMetadata }) || undefined

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