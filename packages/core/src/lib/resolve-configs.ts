import type { OutputFormat } from '../index.js'

/**
 * This function calculates the cartesian product of a set of sets.
 */
const cartesian = <T>(sets: T[][]) =>
  sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [[]] as T[][])

/**
 * This function builds up all possible combinations the given entries can be combined
 * and returns it as an array of objects that can be given to a the transforms.
 * @param entries The url parameter entries
 * @returns An array of directive options
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

export type ImageConfig = Record<string, string | string[]>
