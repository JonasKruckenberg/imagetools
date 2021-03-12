import { MetaDirective } from "../types";

export interface QualityOptions {
    quality: string
}

export const quality: MetaDirective<QualityOptions> = ({ quality }, ctx) => {
    if (!quality || !parseInt(quality)) return

    return parseInt(quality)
}