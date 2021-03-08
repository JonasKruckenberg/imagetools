import { Directive } from "../types"

interface RotateOptions {
    rotate: string
}

export const rotate: Directive<RotateOptions> = ({ rotate }, { useParam, setMetadata }) => {
    const degrees = parseInt(rotate)

    if (isNaN(degrees)) return null

    useParam('rotate')
    setMetadata('rotate', degrees)

    return function rotateTransform(image) {
        return image.rotate(degrees)
    }
}