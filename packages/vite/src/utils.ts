import { createHash } from 'node:crypto'
import path from 'node:path'
import type { ImageConfig } from 'imagetools-core'

export const createBasePath = (base?: string) => {
  return (base?.replace(/\/$/, '') || '') + '/@imagetools/'
}

export function generateImageID(url: URL, config: ImageConfig, imageHash: string) {
  if (url.host) {
    const baseURL = new URL(url.origin + url.pathname)
    return hash([baseURL.href, JSON.stringify(config), imageHash])
  }

  // baseURL isn't a valid URL, but just a string used for an identifier
  // use a relative path in the local case so that it's consistent across machines
  const baseURL = new URL(url.protocol + path.relative(process.cwd(), url.pathname))
  return hash([baseURL.href, JSON.stringify(config), imageHash])
}

export function hash(keyParts: Array<string | NodeJS.ArrayBufferView>) {
  let hash = createHash('sha1')
  for (const keyPart of keyParts) {
    hash = hash.update(keyPart)
  }
  return hash.digest('hex')
}
