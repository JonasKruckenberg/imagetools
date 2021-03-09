import { Color } from "sharp";
import { MetaDirective } from "../types";

interface BackgroundOptions {
    background: string
}

export const background:MetaDirective<BackgroundOptions,Color> = ({ background }, ctx) => {
    if (!background) return null

    ctx.useParam('background')
    ctx.setMetadata('background', background)

    return background
}