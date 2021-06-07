export function parseURL(rawURL: string) {
    return new URL(rawURL.replace(/#/g, '%23'), 'file://')
}

const excludeList = ['metadata', 'meta']

export function extractEntries(url: URL) {

    const entries: Array<[string, string[]]> = []

    for (const [key, value] of url.searchParams) {
        if (excludeList.includes(key)) {
            entries.push([key, [value]])
        } else {
            entries.push([key, value.split(';')])
        }
    }

    return entries
}