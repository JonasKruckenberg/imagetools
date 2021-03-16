import { Sharp } from "sharp"
import { ImageTransformation, TransformResult } from "../types"
import { METADATA } from "./metadata"

export async function applyTransforms(transforms: ImageTransformation[], image: Sharp): Promise<TransformResult> {
    image[METADATA] = await image.metadata()

    // delete the xmp buffer to not leak private metadata
    delete image[METADATA].xmp
    delete image[METADATA].exif
    delete image[METADATA].iptc

    image = transforms.reduce((img, transform) => transform(img), image)

    return {
        image,
        metadata: image[METADATA]
    }
}