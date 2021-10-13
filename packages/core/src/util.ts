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
