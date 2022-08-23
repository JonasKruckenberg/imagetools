import sharp from 'sharp'
import { ImageConfig } from './types'
import { createHash } from 'crypto'

export function loadImage(path: string) {
  return sharp(path)
}

export function generateImageID(url: URL, config: ImageConfig) {
  const baseURL = url.host ? new URL(url.origin + url.pathname) : new URL(url.protocol + url.pathname)

  return createHash('sha1').update(baseURL.href).update(JSON.stringify(config)).digest('hex')
}

export const mime: Map<string,string> = createMimeTypes()

function createMimeTypes() {
  const mime = new Map<string,string>()
  mime.set('avif', 'image/avif')
  mime.set('bmp', 'image/bmp')
  mime.set('gif', 'image/gif')
  mime.set('heic', 'image/heic')
  mime.set('heif', 'image/heif')
  mime.set('ico', 'image/vnd.microsoft.icon')
  mime.set('jpeg', 'image/jpeg')
  mime.set('jpg', 'image/jpeg')
  mime.set('png', 'image/png')
  mime.set('svg', 'image/svg+xml')
  mime.set('tif', 'image/tiff')
  mime.set('tiff', 'image/tiff')
  mime.set('webp', 'image/webp')
  return mime;
}
