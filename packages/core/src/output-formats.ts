import type { ImageConfig, Img, OutputFormat, Picture, Source } from './types'

export const urlFormat: OutputFormat = () => (metadatas) => {
  const urls: string[] = metadatas.map((metadata) => metadata.src as string)

  return urls.length == 1 ? urls[0] : urls
}

export const srcsetFormat: OutputFormat = () => (metadatas) => {
  const sources = metadatas.map((meta) => `${meta.src} ${meta.width}w`)

  return sources.join(', ')
}

export const metadataFormat: OutputFormat = (whitelist) => (metadatas) => {
  if (whitelist) {
    metadatas = metadatas.map((cfg) => Object.fromEntries(Object.entries(cfg).filter(([k]) => whitelist.includes(k))))
  }

  metadatas.forEach((m) => delete m.image)

  return metadatas.length === 1 ? metadatas[0] : metadatas
}

const metadataToSource = (m: ImageConfig) => ({ src: m.src, w: m.width } as Source)

/** normalizes the format for use in mime-type */
const format = (m: ImageConfig) => (m.format as string).replace('jpg', 'jpeg')

export const sourceFormat: OutputFormat = () => (metadatas) => {
  return metadatas.map((m) => metadataToSource(m))
}

export const imgFormat: OutputFormat = () => (metadatas) => {
  let largestImage
  let largestImageSize = 0
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    if ((m.width as number) > largestImageSize) {
      largestImage = m
      largestImageSize = m.width as number
    }
  }

  const result: Img = {
    src: largestImage?.src as string,
    w: largestImage?.width as number,
    h: largestImage?.height as number
  }

  if (metadatas.length >= 2) {
    result.srcset = []
    for (let i = 0; i < metadatas.length; i++) {
      result.srcset.push(metadataToSource(metadatas[i]))
    }
  }

  return result
}

/** fallback format should be specified last */
export const pictureFormat: OutputFormat = () => (metadatas) => {
  const fallbackFormat = [...new Set(metadatas.map((m) => format(m)))].pop()

  let largestFallback
  let largestFallbackSize = 0
  let fallbackFormatCount = 0
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    if (format(m) === fallbackFormat) {
      fallbackFormatCount++
      if ((m.width as number) > largestFallbackSize) {
        largestFallback = m
        largestFallbackSize = m.width as number
      }
    }
  }

  const sources: Record<string, Source[]> = {}
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    const f = format(m)
    // we don't need to create a source tag for the fallback format if there is
    // only a single image in that format
    if (f === fallbackFormat && fallbackFormatCount < 2) {
      continue
    }
    if (sources[f]) {
      sources[f].push(metadataToSource(m))
    } else {
      sources[f] = [metadataToSource(m)]
    }
  }

  const result: Picture = {
    sources,
    // the fallback should be the largest image in the fallback format
    // we assume users should never upsize an image because that is just wasted
    // bytes since the browser can upsize just as well
    img: {
      src: largestFallback?.src as string,
      w: largestFallback?.width as number,
      h: largestFallback?.height as number
    }
  }
  return result
}

export const builtinOutputFormats = {
  url: urlFormat,
  source: sourceFormat,
  srcset: srcsetFormat,
  img: imgFormat,
  picture: pictureFormat,
  metadata: metadataFormat,
  meta: metadataFormat
}
