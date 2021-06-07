import { ImageTransformFactory } from "../types";
import { setMetadata } from "../lib/metadata";

export const hsb: ImageTransformFactory<'hue' | 'saturation' | 'brightness'> = (target) => {

    const hue = target.hue && parseInt(target.hue)
    const saturation = target.saturation && parseFloat(target.saturation)
    const brightness = target.brightness && parseFloat(target.brightness)

    if (!hue && !saturation && !brightness) return

    return function hsbTransform(image) {
        setMetadata(image, 'hue', hue)
        setMetadata(image, 'saturation', saturation)
        setMetadata(image, 'brightness', brightness)

        return image.modulate({
            hue: hue || 0,
            saturation: saturation || 1,
            brightness: brightness || 1
        })
    }
}