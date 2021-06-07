import { ImageTransform, getMetadata, setMetadata } from "imagetools-core"
import { basename, extname } from 'path'

export const emitFile: ImageTransform = async function emitFileTransform(image) {
    const format = getMetadata(image, 'format') as string
    const src = getMetadata(image, 'src') as string

    const fileName = basename(src, extname(src)) + `.${format}`

    const fileHandle = this.emitFile({
        name: fileName,
        source: await image.toBuffer(),
        type: 'asset'
    })

    setMetadata(image, 'src', `__ROLLUP_IMAGE_ASSET__${fileHandle}__`)

    return image
}