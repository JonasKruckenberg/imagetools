import sharp from "sharp";
import { createHash } from 'crypto'

export function loadImage(path: string) {
    return sharp(path)
}

export function generateImageID(url: URL, target: Record<string, any>) {
    const baseURL = url.host
        ? new URL(url.origin + url.pathname)
        : new URL(url.protocol + url.pathname)

    return createHash('sha1').update(baseURL.href).update(JSON.stringify(target)).digest('hex')
}

export const AFTER_EMIT = Symbol('after emit')