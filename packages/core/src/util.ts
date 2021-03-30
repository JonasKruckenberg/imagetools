import sharp from "sharp";
import { ImageConfig } from "./types";
import { createHash } from 'crypto'

export function loadImageFromDisk(path: string) {
    return sharp(path)
}

export function loadImageFromBuffer(buf: Buffer) {
    return sharp(buf)
}

export function generateImageID(url:URL, config:ImageConfig) {
    const baseURL = new URL(url.origin + url.pathname)
    
    return createHash('sha1').update(baseURL.href).update(JSON.stringify(config)).digest('hex')
}