import type { ImageConfig, OutputFormat } from './types'

export const urlFormat: OutputFormat = () => (metadatas) => {
  const urls: string[] = metadatas.map((metadata) => metadata.src)

  return urls.length == 1 ? urls[0] : urls
}

export const srcsetFormat: OutputFormat = () => (metadatas: ImageConfig[]) => {
  const sources = metadatas.map((meta) => `${meta.src} ${meta.width}w`)

  return sources.join(', ')
}

export const metadataFormat: OutputFormat = (whitelist?: string[]) => (metadatas: ImageConfig[]) => {
  if (whitelist) {
    metadatas = metadatas.map((cfg) => Object.fromEntries(Object.entries(cfg).filter(([k]) => whitelist!.includes(k))))
  }

  return metadatas.length === 1 ? metadatas[0] : metadatas
}

export const builtinOutputFormats = {
  url: urlFormat,
  srcset: srcsetFormat,
  metadata: metadataFormat,
  meta: metadataFormat
}
