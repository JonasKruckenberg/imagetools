export function parseURL(rawURL: string) {
  return new URL(rawURL.replace(/#/g, '%23'), 'file://')
}

export function extractEntries(searchParams: URLSearchParams) {
  const entries: Array<[string, string[]]> = []

  for (const [key, value] of searchParams) {
    const values = value.includes(':') ? [value] : value.split(';')
    entries.push([key, values])
  }

  return entries
}
