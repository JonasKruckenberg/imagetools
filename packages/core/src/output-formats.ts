import type { ImageConfig, OutputFormat } from './types'

export const urlFormat: OutputFormat = (metadatas) => {
    const urls: string[] = metadatas.map(metadata => metadata.src)

    return urls.length == 1 ? urls[0] : urls
}

export const srcsetFormat: OutputFormat = (metadatas: ImageConfig[]) => {
    const sources = metadatas.reduce((prev, meta) => {
        if (prev) {
            return `${prev}, ${meta.src} ${meta.width}w`
        } else {
            return `${meta.src} ${meta.width}w`
        }
    }, '')

    return sources
}

export const metadataFormat: OutputFormat = (metadatas: ImageConfig[]) => {
    return metadatas.length === 1 ? metadatas[0] : metadatas
}

export const builtinOutputFormats = {
    url: urlFormat,
    srcset: srcsetFormat,
    metadata: metadataFormat,
    meta: metadataFormat
}