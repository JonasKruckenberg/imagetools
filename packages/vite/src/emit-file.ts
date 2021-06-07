import { getMetadata, setMetadata, ImageTransformFactory } from "imagetools-core"
import { basename, extname } from 'path'

export const createEmitFile = (cacheId: string): ImageTransformFactory => () => {
    return async function emitFileTransform(image) {
        if (!this.meta.watchMode) {
            const format = getMetadata(image, 'format') as string
            const src = getMetadata(image, 'src') as string

            const fileName = basename(src, extname(src)) + `.${format}`

            const fileHandle = this.emitFile({
                name: fileName,
                source: await image.toBuffer(),
                type: 'asset'
            })

            setMetadata(image, 'src', `__VITE_IMAGE_ASSET__${fileHandle}__`)
        } else {
            setMetadata(image, 'src', `@imagetools:${cacheId}`)
        }

        return image
    }
}