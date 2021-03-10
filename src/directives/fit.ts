import { MetaDirective } from "../types";

export interface FitOptions {
    fit: FitValue
}

export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

export type FitValue = typeof fitValues[number]

/**
 * When both a `width` and `height` are provided, 
 * this directive can be used to specify the method by which the image should **fit**.
 * 
 * @name Fit
 * @category Import Directives
 * @keyword `fit`
 * @type _cover_ \| _contain_ \| _fill_ \| _inside_ \| _outside_ 
 */
export const fit: MetaDirective<FitOptions, FitValue> = ({ fit }, ctx) => {
    if (!fit || !fitValues.includes(fit)) return null

    ctx.useParam('fit')
    ctx.setMetadata('fit', fit)

    return fit
}