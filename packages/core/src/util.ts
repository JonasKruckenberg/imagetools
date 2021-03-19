import sharp from "sharp";
import { ImageConfig } from "./types";
import { createHash } from 'crypto'

export function loadImageFromDisk(path: string) {
    return sharp(path)
}

export function loadImageFromBuffer(buf: Buffer) {
    return sharp(buf)
}

export function generateImageID(config:ImageConfig) {
    return createHash('sha1').update(JSON.stringify(config)).digest('hex')
}