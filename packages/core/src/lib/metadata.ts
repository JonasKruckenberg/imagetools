import { Sharp } from 'sharp'

export const METADATA = Symbol('image metadata')

declare module 'sharp' {
  interface Sharp {
    [METADATA]: Record<string, unknown>
  }
}

export function setMetadata(image: Sharp, key: string, value: unknown) {
  image[METADATA] && (image[METADATA][key] = value)
}

export function getMetadata(image: Sharp, key: string) {
  return image[METADATA]?.[key]
}
