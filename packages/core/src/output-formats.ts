import type { ImageMetadata, Img, OutputFormat, Picture } from './types.js'

export const urlFormat: OutputFormat = () => (metadatas) => {
  const urls: string[] = metadatas.map((metadata) => metadata.src as string)

  return urls.length == 1 ? urls[0] : urls
}

export const srcsetFormat: OutputFormat = () => metadatasToSourceset

export const metadataFormat: OutputFormat = (whitelist) => (metadatas) => {
  const result = whitelist
    ? metadatas.map((cfg) => Object.fromEntries(Object.entries(cfg).filter(([k]) => whitelist.includes(k))))
    : metadatas

  result.forEach((m) => delete m.image)

  return result.length === 1 ? result[0] : result
}

const metadatasToSourceset = (metadatas: ImageMetadata[]) =>
  metadatas
    .map((meta) => {
      const density = meta.pixelDensityDescriptor
      return density ? `${meta.src} ${density}` : `${meta.src} ${meta.width}w`
    })
    .join(', ')

/** normalizes the format for use in mime-type */
const getFormat = (m: ImageMetadata) => {
  if (!m.format) throw new Error(`Could not determine image format`)
  return m.format.replace('jpg', 'jpeg')
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
    result.srcset = metadatasToSourceset(metadatas)
  }

  return result
}

/** fallback format should be specified last */
export const pictureFormat: OutputFormat = () => (metadatas) => {
  const fallbackFormat = [...new Set(metadatas.map((m) => getFormat(m)))].pop()

  let largestFallback
  let largestFallbackSize = 0
  let fallbackFormatCount = 0
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    if (getFormat(m) === fallbackFormat) {
      fallbackFormatCount++
      if ((m.width as number) > largestFallbackSize) {
        largestFallback = m
        largestFallbackSize = m.width as number
      }
    }
  }

  const sourceMetadatas: Record<string, ImageMetadata[]> = {}
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    const f = getFormat(m)
    // we don't need to create a source tag for the fallback format if there is
    // only a single image in that format
    if (f === fallbackFormat && fallbackFormatCount < 2) {
      continue
    }
    if (sourceMetadatas[f]) {
      sourceMetadatas[f].push(m)
    } else {
      sourceMetadatas[f] = [m]
    }
  }

  const sources: Record<string, string> = {}
  for (const [key, value] of Object.entries(sourceMetadatas)) {
    sources[key] = metadatasToSourceset(value)
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
  srcset: srcsetFormat,
  img: imgFormat,
  picture: pictureFormat,
  metadata: metadataFormat,
  meta: metadataFormat
}
