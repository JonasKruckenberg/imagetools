import { Sharp } from "sharp"

export const METADATA = Symbol('image metadata')

declare module 'sharp' {
    interface Sharp {
        [METADATA]: Record<string, any>
    }
}

export async function initializeMetadata(image: Sharp, source:URL, stripPrivateMetadata = true) {
    image[METADATA] = await image.metadata()
    image[METADATA].src = source.pathname

    if(stripPrivateMetadata) {
        // delete the private metadata
        delete image[METADATA].exif
        delete image[METADATA].iptc
        delete image[METADATA].xmp
        delete image[METADATA].tifftagPhotoshop
        delete image[METADATA].icc
    } else {
        image.withMetadata()
    }

    return image
}


export function setMetadata(image: Sharp, key: string, value: any) {
    image[METADATA] && (image[METADATA][key] = value)
}

export function getMetadata(image: Sharp, key?: string) {
    return key ? image[METADATA]?.[key] : image[METADATA]
}