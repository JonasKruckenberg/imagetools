import { Color } from "sharp";
import { MetaDirective } from "../types";

export interface BackgroundOptions {
    background: string
}

/**
 * This instructs various directives (e.g. the [rotate](#rotate)) to use the specified color when filling empty spots in the image.
 *
 * The argument will be parsed by the [color-string](https://www.npmjs.com/package/color-string) library so css all color features can be used.
 *
 * > NOTE: This directive does nothing on it's own, it has to be used in conjunction with another directive.<br>
 * > You also cannot set multiple values.
 * 
 * @example
 * ```js
 * import Image from 'foo.jpg`background=FFFFFFAA'
 * ```
 * 
 * @name Background
 * @category "Import Directives"
 * @keyword `background`
 * @type _string_
 */
export const background:MetaDirective<BackgroundOptions,Color> = ({ background }, ctx) => {
    if (!background) return null

    ctx.useParam('background')
    ctx.setMetadata('background', background)

    return '#' + background
}