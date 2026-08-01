import type { ImageMetadata, Img, OutputFormat, Picture, ProcessedImageMetadata } from './types.js'

export const urlFormat: OutputFormat = () => (metadatas) => {
  const urls: string[] = metadatas.map((metadata) => metadata.src as string)

  return urls.length == 1 ? urls[0] : urls
}

export const srcsetFormat: OutputFormat = () => metadatasToSourceset

export const metadataFormat: OutputFormat = (whitelist) => (metadatas) => {
  const result = whitelist
    ? metadatas.map((cfg) => Object.fromEntries(Object.entries(cfg).filter(([k]) => whitelist.includes(k))))
    : metadatas.map((cfg) => Object.fromEntries(Object.entries(cfg).filter(([k]) => k !== 'image' && k !== 'config')))

  return result.length === 1 ? result[0] : result
}

/**
 * Parses the `basePixels` directive into a positive number, or `undefined` if it is not set or invalid.
 * A `basePixels` value of `0` or less disables pixel density descriptors.
 */
function parseBasePixels(value: string | string[] | undefined): number | undefined {
  if (typeof value !== 'string') return undefined
  const basePixels = Number(value)
  return Number.isFinite(basePixels) && basePixels > 0 ? basePixels : undefined
}

/**
 * Derives the pixel density descriptor (e.g. `"2x"`) for a single image from its `basePixels`
 * directive and the final image width, or `undefined` if `basePixels` is not set.
 */
function getPixelDensityDescriptor(metadata: ProcessedImageMetadata): string | undefined {
  const basePixels = parseBasePixels(metadata.config.basePixels)
  if (!basePixels || !metadata.width) return undefined
  return `${metadata.width / basePixels}x`
}

const metadatasToSourceset = (metadatas: ProcessedImageMetadata[]) =>
  metadatas
    .map((meta) => {
      const density = getPixelDensityDescriptor(meta)
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

  const sourceMetadatas: Record<string, ProcessedImageMetadata[]> = {}
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
