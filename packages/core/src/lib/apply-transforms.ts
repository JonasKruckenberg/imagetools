import { PluginContext } from "rollup"
import { Sharp } from "sharp"
import { ImageTransform } from "../types"

export async function applyTransforms(this: PluginContext, transforms: ImageTransform[], image: Sharp) {
    for (const transform of transforms) {
        const result = await transform.call(this, image)
        if (Array.isArray(result)) return result
        if (result) image = result
    }
}