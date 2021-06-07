import { GetParam } from "../types"

export const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'] as const

export type FitValue = typeof fitValues[number]

export const getFit: GetParam<'fit' | FitValue, FitValue> = ({ fit, ...rest }) => {
    fit ||= Object.keys(rest).find((k): k is FitValue => fitValues.includes(k as FitValue))

    if(!fit || !fitValues.includes(fit as FitValue)) return

    return fit as FitValue
}