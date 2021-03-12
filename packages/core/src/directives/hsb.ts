import { Directive } from "../types";

export interface HSBOptions {
    hue: string
    saturation: string
    brightness: string
}

export const hsb: Directive<HSBOptions> = (config, ctx) => {

    const hue = config.hue && parseInt(config.hue)
    const saturation = config.saturation && parseFloat(config.saturation)
    const brightness = config.brightness && parseFloat(config.brightness)

    if(!hue && !saturation && !brightness) return

    return function hsbTransform(image) {
        return image.modulate({
            hue: hue || 0,
            saturation: saturation || 1,
            brightness: brightness || 1
        })
    }
}