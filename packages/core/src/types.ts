import { Sharp } from "sharp";

export type ImageConfig = Record<string,any>

export interface DirectiveContext {
    useParam: (parameter: string) => void
    warn: (message: string) => void
}

export type Directive<A = {}> = (metadata: Partial<ImageConfig & A>, ctx: DirectiveContext) => ImageTransformation | undefined

export type TransformOption<A = {},T = any> = (metadata: Partial<ImageConfig & A>, image: Sharp) => T | undefined

export type ImageTransformation = (image: Sharp) => Sharp

export interface TransformResult {
    image: Sharp,
    metadata: Record<string,any>
}