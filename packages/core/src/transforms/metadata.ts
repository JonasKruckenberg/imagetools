import { getMetadata } from "../lib/metadata";
import { ImageTransformFactory } from '../types'
import { AFTER_EMIT } from "../util";

export const metadataOutput: ImageTransformFactory = (target) => {
    const whitelist = (target.metadata ?? target.meta)?.split(';')
    if (whitelist) {
        return function metadataOutputTransform(image) {
            return [withWhitelist(getMetadata(image), whitelist), image]
        }
    }
}

metadataOutput[AFTER_EMIT] = true

function withWhitelist(object: Record<string, any>, whitelist: string[]) {
    if (whitelist.length === 1 && !whitelist[0]) return object
    return Object.fromEntries(Object.entries(object).filter(([key]) => whitelist.includes(key)))
}