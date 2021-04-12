
/**
 * This function calculates the cartesian product of two or more array and is straight from stackoverflow ;)
 * Should be replaced with something more legible but works for now.
 * @internal
 */
export const cartesian = (...a: any[]) => a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())))

/**
 * This function builds up all possible combinations the given entries can be combined
 * an returns it as an array of objects that can be given to a the transforms.
 * @param entries The url parameter entries
 * @returns An array of directive options
 */
export function resolveConfigs(entries: Array<[string, string[]]>) {

    // create a new array of entries for each argument
    const singleArgumentEntries = entries
        .map(([key, values]) => values.map<[[string, string]]>(v => [[key, v]]))

    // // do a cartesian product on all entries to get all combainations we need to produce
    const combinations = singleArgumentEntries
        .reduce((prev, cur) => prev.length ? cartesian(prev, cur) : cur, [])

    // // and return as an array of objects
    return combinations.map((options) => Object.fromEntries(options))
}