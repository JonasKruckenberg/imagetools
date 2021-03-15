import sharp from "sharp";

export function loadImageFromDisk(path: string) {
    return sharp(path)
}

export function loadImageFromBuffer(buf: Buffer) {
    return sharp(buf)
}

/**
 * This function calculates the cartesian product of two or more array and is straight from stackoverflow ;)
 * Should be replaced with something more legible but works for now.
 * @internal
 */
 export const cartesian = (...a: any[]) => a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())))
