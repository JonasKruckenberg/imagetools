import { Directive } from "../types"

interface ResizeOptions {
    height: string
    width: string
}

export const resize: Directive<ResizeOptions> = ({ width: _width, height: _height }, { useParam, setMetadata }) => {
    const width = parseInt(_width) || null
    const height = parseInt(_height) || null

    if (!width && !height) return null

    if (width) {
        useParam('width')
        setMetadata('width', width)
    }

    if (height) {
        useParam('height')
        setMetadata('height', height)
    }

    return function resizeTransform(image) {
        return image.resize({
            width,
            height
        })
    }
}