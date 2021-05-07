import { Sharp } from "sharp";

export type ImageConfig = Record<string,any>

export interface TransformFactoryContext {
    useParam: (parameter: string) => void
    warn: (message: string) => void
}

export type TransformFactory<A = {}> = (metadata: Partial<ImageConfig & A>, ctx: TransformFactoryContext) => ImageTransformation | undefined

export type TransformOption<A = {},T = any> = (metadata: Partial<ImageConfig & A>, image: Sharp) => T | undefined

export type ImageTransformation = (image: Sharp) => Sharp | Promise<Sharp>

export interface TransformResult {
    image: Sharp,
    metadata: Record<string,any>
}

export type OutputFormat = (metadata: ImageConfig[]) => any
