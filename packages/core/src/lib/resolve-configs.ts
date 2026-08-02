import type { ImageConfig, OutputFormat } from '../types.js'

/**
 * Computes the cartesian product of an array of sets.
 */
const cartesian = <T>(sets: T[][]) =>
  sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [[]] as T[][])

/**
 * Builds every combination the given URL entries can be combined into, as an
 * array of configs that can be passed to the transforms. Output format
 * parameters (e.g. `as=`) are appended to every combination instead of
 * contributing to the product.
 * @param entries The URL parameter entries
 * @returns An array of directive configs
 */
export function resolveConfigs(
  entries: Array<[string, string[]]>,
  outputFormats: Record<string, OutputFormat>
): ImageConfig[] {
  // create a new array of entries for each argument
  const singleArgumentEntries = entries
    .filter(([k]) => !(k in outputFormats))
    .map(([key, values]) => values.map<[string, string]>((v) => [key, v]))

  // do a cartesian product on all entries to get all combinations we need to produce
  const combinations = cartesian(singleArgumentEntries)

  const metadataAddons = entries.filter(([k]) => k in outputFormats)

  // and return as an array of objects
  const out: ImageConfig[] = combinations.map((options) => Object.fromEntries([...options, ...metadataAddons]))

  return out.length ? out : [Object.fromEntries(metadataAddons)]
}
