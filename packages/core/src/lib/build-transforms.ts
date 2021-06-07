import { ImageTransform, ImageTransformFactory } from "../types"

export function buildTransforms(factories: ImageTransformFactory[], target: Record<string, any>) {
    return factories
        .map(f => f(target))
        .filter((f): f is ImageTransform => typeof f === 'function')
}