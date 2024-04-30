import { createHash } from 'node:crypto'
import type { ImageConfig } from 'imagetools-core'

export const createBasePath = (base?: string) => {
  return (base?.replace(/\/$/, '') || '') + '/@imagetools/'
}

export function generateImageID(config: ImageConfig, imageHash: string) {
  return hash([JSON.stringify(config), imageHash])
}

export function hash(keyParts: Array<string | NodeJS.ArrayBufferView>) {
  let hash = createHash('sha1')
  for (const keyPart of keyParts) {
    hash = hash.update(keyPart)
  }
  return hash.digest('hex')
}
