import { Directive } from "../types";

export interface HSBOptions {
    hue: string
    saturation: string
    brightness: string
}

/**
 * Adjusts the images hue rotation by the given number of degrees.
 * Commonly used together with [`saturation`](#saturation) and [`brightness`](#brightness).
 * @name Hue
 * @category "Import Directives"
 * @keyword `hue`
 * @type _integer_
 */
/**
 * Adjusts the images saturation with the given saturation multiplier.
 * Commonly used together with [`hue`](#hue) and [`brightness`](#brightness).
 * @name Saturation
 * @category "Import Directives"
 * @keyword `saturation`
 * @type _float_
 */
/**
 * Adjusts the images brightness with the given brightness multiplier.
 * Commonly used together with [`hue`](#hue) and [`saturation`](#saturation).
 * @name Brightness
 * @category "Import Directives"
 * @keyword `brightness`
 * @type _float_
 */
export const hsb: Directive<HSBOptions> = (opts, ctx) => {
    let hue: number | undefined = undefined
    let saturation: number | undefined = undefined
    let brightness: number | undefined = undefined

    if (opts.hue) {
        hue = parseInt(opts.hue)
        ctx.useParam('hue')
        ctx.setMetadata('hue', hue)
    }

    if (opts.saturation) {
        saturation = parseFloat(opts.saturation)
        ctx.useParam('saturation')
        ctx.setMetadata('saturation', saturation)
    }

    if (opts.brightness) {
        brightness = parseFloat(opts.brightness)
        ctx.useParam('brightness')
        ctx.setMetadata('brightness', brightness)
    }

    if (!brightness && !saturation && !hue) return null

    const filteredOpts = Object.fromEntries(Object
        .entries({ hue, saturation, brightness })
        .filter(([, v]) => !!v)
    )

    return function hsbTransform(image) {
        return image.modulate(filteredOpts)
    }
}