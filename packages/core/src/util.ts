import { createHash } from 'node:crypto'
import path from 'node:path'
import sharp from 'sharp'
import { ImageConfig } from './types.js'

export function loadImage(path: string) {
  return sharp(path)
}

export function generateImageID(url: URL, config: ImageConfig) {
  // this isn't a valid URL, but just a string used for an identifier
  // use a relative path in the local case so that it's consistent across machines
  const baseURL = url.host
    ? new URL(url.origin + url.pathname)
    : new URL(url.protocol + path.relative(process.cwd(), url.pathname))

  return createHash('sha1').update(baseURL.href).update(JSON.stringify(config)).digest('hex')
}
