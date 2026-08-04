import { createHash } from 'node:crypto'
import { writeFile, rename, rm } from 'node:fs/promises'
import type { ImageConfig } from 'imagetools-core'

let tmpCounter = 0

/**
 * Writes `data` to `path` by staging it under a unique temporary name in the same
 * directory and renaming it into place. `rename(2)` is atomic within a filesystem,
 * so an interrupted build leaves either no file or a complete one — never a
 * truncated file that a later run would read back as a valid cache entry.
 */
export async function writeFileAtomic(path: string, data: Buffer) {
  const tmpPath = `${path}.${process.pid}-${tmpCounter++}.tmp`
  try {
    await writeFile(tmpPath, data)
    await rename(tmpPath, path)
  } catch (err) {
    await rm(tmpPath, { force: true })
    throw err
  }
}

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
