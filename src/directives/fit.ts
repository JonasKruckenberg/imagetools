import { MetaDirective } from "../types";

interface FitOptions {
    fit: FitValue
}

export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

export type FitValue = typeof fitValues[number]

export const fit: MetaDirective<FitOptions, FitValue> = ({ fit }, ctx) => {
    if (!fit || !fitValues.includes(fit)) return null

    ctx.useParam('fit')
    ctx.setMetadata('fit', fit)

    return fit
}