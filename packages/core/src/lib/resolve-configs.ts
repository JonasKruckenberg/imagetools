import type { OutputFormat } from '../index.js'

/**
 * This function calculates the cartesian product of two or more arrays and is straight from stackoverflow ;)
 * Should be replaced with something more legible but works for now.
 */
const cartesian = (...a: [[string, string]][][]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())))

/**
 * This function builds up all possible combinations the given entries can be combined
 * and returns it as an array of objects that can be given to a the transforms.
 * @param entries The url parameter entries
 * @returns An array of directive options
 */
export function resolveConfigs(
  entries: Array<[string, string[]]>,
  outputFormats: Record<string, OutputFormat>
): Record<string, string | string[]>[] {
  // create a new array of entries for each argument
  const singleArgumentEntries = entries
    .filter(([k]) => !(k in outputFormats))
    .map(([key, values]) => values.map<[[string, string]]>((v) => [[key, v]]))

  // do a cartesian product on all entries to get all combinations we need to produce
  const combinations = singleArgumentEntries
    // .filter(([key]) => !(key[0][0] in outputFormats))
    .reduce((prev, cur) => (prev.length ? cartesian(prev, cur) : cur), [])

  const metadataAddons = entries.filter(([k]) => k in outputFormats)

  // and return as an array of objects
  const out: Record<string, string | string[]>[] = combinations.map((options) =>
    Object.fromEntries([...options, ...metadataAddons])
  )

  return out.length ? out : [Object.fromEntries(metadataAddons)]
}
