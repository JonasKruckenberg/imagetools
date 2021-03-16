import { ImageTransformation, ImageConfig, Directive, DirectiveContext } from "../types"

export function generateTransforms(config: ImageConfig, directives: Directive[]) {
    const transforms: ImageTransformation[] = []
    const parametersUsed = new Set<string>()
    const warnings: string[] = []

    const context: DirectiveContext = {
        useParam: k => parametersUsed.add(k),
        warn: m => warnings.push(m)
    }

    for (const directive of directives) {
        const transform = directive(config, context)

        if (typeof transform === 'function') transforms.push(transform)
    }

    return {
        transforms,
        parametersUsed,
        warnings
    }
}