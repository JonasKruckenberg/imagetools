import { Sharp } from 'sharp'

export const METADATA = Symbol('image metadata')

declare module 'sharp' {
  interface Sharp {
    [METADATA]: Record<string, any>
  }
}

export function setMetadata(image: Sharp, key: string, value: any) {
  image[METADATA] && (image[METADATA][key] = value)
}

export function getMetadata(image: Sharp, key: string) {
  return image[METADATA]?.[key]
}
