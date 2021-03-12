import { Sharp } from "sharp";

export type ImageConfig = Record<string,any>

export interface DirectiveContext {
    useParam: (parameter: string) => void
    addMetadata: (key: string, value: any) => void
    warn: (message: string) => void
}

export type Directive<A = {}> = (metadata: Partial<ImageConfig & A>, ctx: DirectiveContext) => ImageTransformation | undefined

export type MetaDirective<A = {},T = any> = (metadata: Partial<ImageConfig & A>, ctx: DirectiveContext) => T | undefined

export type ImageTransformation = (image: Sharp) => Sharp