import sharp, { Sharp } from "sharp";

export function loadImageFromDisk(path: string) {
    return sharp(path)
}

export function loadImageFromBuffer(buf: Buffer) {
    return sharp(buf)
}