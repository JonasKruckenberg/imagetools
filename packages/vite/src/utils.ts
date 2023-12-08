import { createHash } from 'node:crypto'
import path from 'node:path'
import { stat } from 'node:fs/promises'
import type { ImageConfig } from 'imagetools-core'
import type { Sharp } from 'sharp'

export const createBasePath = (base?: string) => {
  return (base?.replace(/\/$/, '') || '') + '/@imagetools/'
}

export async function generateImageID(url: URL, config: ImageConfig, originalImage: Sharp) {
  if (url.host) {
    const baseURL = new URL(url.origin + url.pathname)
    const buffer = await originalImage.toBuffer()
    return hash([baseURL.href, JSON.stringify(config), buffer])
  }

  // baseURL isn't a valid URL, but just a string used for an identifier
  // use a relative path in the local case so that it's consistent across machines
  const baseURL = new URL(url.protocol + path.relative(process.cwd(), url.pathname))
  const { mtime } = await stat(path.resolve(process.cwd(), decodeURIComponent(url.pathname)))
  return hash([baseURL.href, JSON.stringify(config), mtime.getTime().toString()])
}

function hash(keyParts: Array<string | NodeJS.ArrayBufferView>) {
  let hash = createHash('sha1')
  for (const keyPart of keyParts) {
    hash = hash.update(keyPart)
  }
  return hash.digest('hex')
}
