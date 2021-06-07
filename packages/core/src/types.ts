import type { Sharp } from "sharp";
import type { PluginContext } from 'rollup'
import { AFTER_EMIT } from "./util";

export interface ImageTransformFactory<Keys extends string | number | symbol = string> {
    (target: Partial<Record<Keys, string>>): ImageTransform | undefined,
    [AFTER_EMIT]?: boolean
}

export type ImageTransform = (this: PluginContext, image: Sharp) => Sharp | [code: unknown, image: Sharp] | undefined | Promise<Sharp | [result: unknown, image: Sharp] | undefined>

export type GetParam<Keys extends string | number | symbol, Return> = (target: Partial<Record<Keys, string>>) => Return | undefined

export type DefaultTarget = Record<string, string>