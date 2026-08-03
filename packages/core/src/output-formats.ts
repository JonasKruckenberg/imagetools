import type { Metadata } from 'sharp'
import type { AppliedTransforms, Img, OutputFormat, Picture, ProcessedImage } from './types.js'

/**
 * Emits the URL of the image, or an array of URLs when multiple configs are resolved.
 */
export const urlFormat: OutputFormat = () => (metadatas) => {
  const urls: string[] = metadatas.map((metadata) => metadata.src)

  return urls.length == 1 ? urls[0] : urls
}

/**
 * Emits a `srcset` string built from each image's URL and width descriptor
 * (or pixel density descriptor when `basePixels` is set).
 */
export const srcsetFormat: OutputFormat = () => metadatasToSourceset

/**
 * The flat object emitted by the `as=metadata` output format: the raw sharp
 * metadata of the source image combined with the values threaded through the
 * transforms, with `width`, `height` and `format` reflecting the final output,
 * plus the image URL.
 */
type FlatMetadata = Omit<Metadata, 'format'> &
  Omit<AppliedTransforms, 'format'> & {
    format: string
    src: string
  }

function flatten(metadata: ProcessedImage): FlatMetadata {
  return {
    ...metadata.sharpMetadata,
    ...metadata.transforms,
    width: metadata.info.width,
    height: metadata.info.height,
    format: metadata.transforms.format ?? metadata.sharpMetadata.format,
    src: metadata.src
  }
}

/**
 * Emits the flat metadata of the image, or only the `whitelist` keys of it.
 */
export const metadataFormat: OutputFormat = (whitelist) => (metadatas) => {
  const result = whitelist ? metadatas.map((metadata) => pick(flatten(metadata), whitelist)) : metadatas.map(flatten)

  return result.length === 1 ? result[0] : result
}

/**
 * Returns a new object containing only the keys of `source` that are listed in `keys`,
 * preserving the order in which they appear on `source`.
 */
function pick<T extends object>(source: T, keys: string[]): Partial<T> {
  const result: Partial<T> = {}
  for (const key of Object.keys(source)) {
    if (keys.includes(key)) {
      result[key as keyof T] = source[key as keyof T]
    }
  }
  return result
}

/**
 * Parses the `basePixels` directive into a positive number, or `undefined` if it is not set or invalid.
 * A `basePixels` value of `0` or less disables pixel density descriptors.
 */
function parseBasePixels(value: string | undefined): number | undefined {
  if (typeof value !== 'string' || !value) return undefined
  const basePixels = Number(value)
  return Number.isFinite(basePixels) && basePixels > 0 ? basePixels : undefined
}

/**
 * Derives the pixel density descriptor (e.g. `"2x"`) for a single image from its `basePixels`
 * directive and the final image width, or `undefined` if `basePixels` is not set.
 */
function getPixelDensityDescriptor(metadata: ProcessedImage): string | undefined {
  const basePixels = parseBasePixels(metadata.config.basePixels)
  if (!basePixels || !metadata.info.width) return undefined
  return `${metadata.info.width / basePixels}x`
}

const metadatasToSourceset = (metadatas: ProcessedImage[]) =>
  metadatas
    .map((meta) => {
      const density = getPixelDensityDescriptor(meta)
      return density ? `${meta.src} ${density}` : `${meta.src} ${meta.info.width}w`
    })
    .join(', ')

/** normalizes the format for use in mime-type */
const getFormat = (m: ProcessedImage) => {
  if (!m.transforms.format) throw new Error(`Could not determine image format`)
  return m.transforms.format.replace('jpg', 'jpeg')
}

/**
 * Emits the `src`, `w` and `h` of the largest image, plus a `srcset` when
 * multiple images are produced.
 */
export const imgFormat: OutputFormat = () => (metadatas) => {
  let largestImage
  let largestImageSize = 0
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    if (m.info.width > largestImageSize) {
      largestImage = m
      largestImageSize = m.info.width
    }
  }

  const result: Img = {
    src: largestImage?.src ?? '',
    w: largestImage?.info.width ?? 0,
    h: largestImage?.info.height ?? 0
  }

  if (metadatas.length >= 2) {
    result.srcset = metadatasToSourceset(metadatas)
  }

  return result
}

/**
 * Emits the `<picture>` sources per format plus the `img` fallback, which should
 * be specified last.
 */
export const pictureFormat: OutputFormat = () => (metadatas) => {
  const fallbackFormat = [...new Set(metadatas.map((m) => getFormat(m)))].pop()

  let largestFallback
  let largestFallbackSize = 0
  let fallbackFormatCount = 0
  for (let i = 0; i < metadatas.length; i++) {
    const m = metadatas[i]
    if (getFormat(m) === fallbackFormat) {
      fallbackFormatCount++
      if (m.info.width > largestFallbackSize) {
        largestFallback = m
        largestFallbackSize = m.info.width
      }
    }
  }

  const sourceMetadatas: Record<string, ProcessedImage[]> = {}
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
      src: largestFallback?.src ?? '',
      w: largestFallback?.info.width ?? 0,
      h: largestFallback?.info.height ?? 0
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
