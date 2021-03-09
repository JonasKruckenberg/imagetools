import { MetaDirective } from "../types";

interface QualityOptions {
    quality: string
}

export const quality: MetaDirective<QualityOptions, number> = ({ quality: _quality }, ctx) => {
    const quality = parseInt(_quality || '')

    if (isNaN(quality) || quality < 1 || quality > 100) return null

    ctx.useParam('quality')
    ctx.setMetadata('quality', quality)

    return quality
}