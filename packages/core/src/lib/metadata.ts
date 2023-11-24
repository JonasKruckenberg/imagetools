import { Sharp } from 'sharp'
import { ImageMetadata } from '../types.js'

export const METADATA = Symbol('image metadata')

declare module 'sharp' {
  interface Sharp {
    [METADATA]: ImageMetadata
  }
}

export function setMetadata(image: Sharp, key: string, value: unknown) {
  image[METADATA] && (image[METADATA][key] = value)
}

export function getMetadata(image: Sharp, key: string) {
  return image[METADATA]?.[key]
}
