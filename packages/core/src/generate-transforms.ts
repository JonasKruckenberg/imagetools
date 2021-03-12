import { Directive, DirectiveContext, ImageConfig, ImageTransformation } from "./types";

export function generateTransforms(config: ImageConfig, directives: Directive[]) {
    const transforms: ImageTransformation[] = []
    const metadata: Record<string, any> = {}
    const parametersUsed = new Set<string>()
    const warnings = new Set<string>()

    const context: DirectiveContext = {
        useParam: k => parametersUsed.add(k),
        addMetadata: (k, v) => metadata[k] = v,
        warn: m => warnings.add(m)
    }

    for (const directive of directives) {
        const transform = directive(config, context)

        if(typeof transform === 'function') transforms.push(transform)
    }

    return {
        transforms,
        metadata,
        parametersUsed,
        warnings
    }
}