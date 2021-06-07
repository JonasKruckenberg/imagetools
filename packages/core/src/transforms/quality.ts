import { GetParam } from "../types";

export interface QualityOptions {
    quality: string
}

export const getQuality: GetParam<'quality', number> = ({ quality: _quality }) => {
    const quality = _quality && parseInt(_quality)
    if (quality) return quality
}