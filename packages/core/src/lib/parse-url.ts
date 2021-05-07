export function parseURL(rawURL: string) {
    return new URL(rawURL.replaceAll('#', '%23'), 'file://')
}

export function extractEntries(url: URL) {

    const entries: Array<[string, string[]]> = []

    for (const [key, value] of url.searchParams) {
        entries.push([key, value.split(';')])
    }

    return entries
}