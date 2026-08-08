import type { ImageConfig, OutputFormat } from '../types.js'

/**
 * Computes the cartesian product of an array of sets.
 */
const cartesian = <T>(sets: T[][]) =>
  sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [[]] as T[][])

/**
 * Builds every combination the given URL entries can be combined into, as an
 * array of image configs that can be passed to the transforms. Output format
 * parameters and the `as` output format selector do not contribute to the
 * product. Note that every key in `outputFormats` is excluded, including custom
 * output formats, so a custom output format whose name collides with a
 * transform directive name will suppress that directive.
 * @param entries The URL parameter entries
 * @returns The image configs
 */
export function resolveConfigs(
  entries: Array<[string, string[]]>,
  outputFormats: Record<string, OutputFormat>
): ImageConfig[] {
  // create a new array of entries for each argument, excluding output format
  // parameters and the `as` output format selector
  const singleArgumentEntries = entries
    .filter(([k]) => !(k in outputFormats) && k !== 'as')
    .map(([key, values]) => values.map<[string, string]>((v) => [key, v]))

  // do a cartesian product on all entries to get all combinations we need to produce
  const combinations = cartesian(singleArgumentEntries)

  return combinations.map((options) => Object.fromEntries(options))
}
