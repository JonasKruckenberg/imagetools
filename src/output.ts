import { OutputFormat } from "./types"

export const metadataOutput: OutputFormat = (src: URL, outputMetadatas: Record<string, any>[]) => {
    if (!src.searchParams.has('metadata') && !src.searchParams.has('meta')) return null

    return outputMetadatas.length === 1 ? outputMetadatas[0] : outputMetadatas
}

export const srcsetOutput: OutputFormat = (src: URL, outputMetadatas: Record<string, any>[]) => {
    if (!src.searchParams.has('srcset')) return null

    return outputMetadatas.length === 1 ? outputMetadatas[0] : outputMetadatas
}

export const urlOutput: OutputFormat = (src: URL, outputMetadatas: Record<string, any>[]) => {
    const out: string[] = outputMetadatas.map(metadata => metadata.src)

    return out.length == 1 ? out[0] : out
}