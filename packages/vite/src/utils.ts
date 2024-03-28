import { createHash } from 'node:crypto'
import path from 'node:path'
import { statSync } from 'node:fs'
import type { ImageConfig } from 'imagetools-core'

export const createBasePath = (base?: string) => {
  return (base?.replace(/\/$/, '') || '') + '/@imagetools/'
}

export async function generateImageID(url: URL, config: ImageConfig, imageBuffer: Buffer) {
  if (url.host) {
    const baseURL = new URL(url.origin + url.pathname)
    return hash([baseURL.href, JSON.stringify(config), imageBuffer])
  }

  // baseURL isn't a valid URL, but just a string used for an identifier
  // use a relative path in the local case so that it's consistent across machines
  const baseURL = new URL(url.protocol + path.relative(process.cwd(), url.pathname))
  const { mtime } = statSync(path.resolve(process.cwd(), decodeURIComponent(url.pathname)))
  return hash([baseURL.href, JSON.stringify(config), mtime.getTime().toString()])
}

function hash(keyParts: Array<string | NodeJS.ArrayBufferView>) {
  let hash = createHash('sha1')
  for (const keyPart of keyParts) {
    hash = hash.update(keyPart)
  }
  return hash.digest('hex')
}
