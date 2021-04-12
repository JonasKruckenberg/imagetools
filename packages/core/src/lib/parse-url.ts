export function parseURL(url: URL) {
    const entries: Array<[string, string[]]> = []

    for (const [key, value] of url.searchParams) {
        entries.push([key, value.split(';')])
    }

    return entries
}