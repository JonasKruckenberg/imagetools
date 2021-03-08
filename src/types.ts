import type { Sharp } from 'sharp'

export type ImageTransformation = (image: Sharp) => Sharp

export type DirectiveOptions = Record<string,any>

export interface DirectiveContext {
    useParam: (param: string) => void
    setMetadata: (key: string, value: any) => void
}

export type Directive<A = {}> = (cfg: DirectiveOptions & A, ctx: DirectiveContext) => ImageTransformation

export type ImageFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'
