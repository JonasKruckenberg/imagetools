import { Directive } from "../types"
import { background as getBackground } from './background'

interface RotateOptions {
    rotate: string
    background: string
}

export const rotate: Directive<RotateOptions> = (ctx, { useParam, setMetadata }) => {
    const degrees = parseInt(ctx.rotate || '')    

    if (isNaN(degrees)) return null

    useParam('rotate')
    setMetadata('rotate', degrees)

    const background = getBackground(ctx,{ useParam, setMetadata }) || undefined

    return function rotateTransform(image) {
        return image.rotate(degrees, { background })
    }
}