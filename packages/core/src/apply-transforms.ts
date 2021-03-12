import sharp from "sharp";
import { ImageTransformation } from "./types";

interface TransformResult {
    data: Uint8Array
    info: Record<string,any>
}

export async function applyTransforms(transforms: ImageTransformation[], src: URL):Promise<TransformResult> {
    let image = sharp(src.pathname)

    image = transforms.reduce((img, transform) => transform(img), image)

    return new Promise((resolve, reject) => {
        image.toBuffer((err, data, info) => {
            if(err) reject(err)

            resolve({
                data,
                info
            })
        })
    })
}