import type { ImageConfig, TransformFactoryContext } from '../types.js'

/**
 * Reports each of `keys` that is set in `config` as used, so a factory can
 * declare every directive its transform reads in one call. Only the names are
 * looked at, never the values: checking a value is up to the transform.
 */
export function useParams(config: Partial<ImageConfig>, ctx: TransformFactoryContext, keys: readonly string[]) {
  for (const key of Object.keys(config)) {
    if (keys.includes(key)) ctx.useParam(key)
  }
}
