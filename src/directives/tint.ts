import { Directive } from "../types";

export interface TintOptions {
    tint: string
}

/**
 * Tints the image using the provided chroma while preserving the image luminance. 
 * If the image has han alpha channel it will be untouched.
 * 
 * @name Tint
 * @category "Import Directives"
 * @keyword `tint`
 * @type _string_
 */
export const tint: Directive<TintOptions> = ({ tint:color }, { useParam, setMetadata }) => {
    if(!color) return null

    useParam('tint')
    setMetadata('tint',color)

    return function tintTransform(image) {
        return image.tint(color)
    }
}