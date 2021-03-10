import { extractParameterEntries } from '../util'

describe('extractParameterEntries', () => {
    it('returns an array of entries', () => {
        const src = new URL('/example.jpg?foo=bar', 'file://')

        const entries = extractParameterEntries(src)

        expect(entries).toBeInstanceOf(Array)
    })

    it('returns a valid array of entries', () => {
        const src = new URL('/example.jpg?foo=bar&hello=world&width=300', 'file://')

        const entries = extractParameterEntries(src)
        // this will throw and fail the test if entries is not a valid array of entries
        const asObject = Object.fromEntries(entries)

        expect(asObject).toHaveProperty('foo', ['bar'])
        expect(asObject).toHaveProperty('hello', ['world'])
        expect(asObject).toHaveProperty('width', ['300'])
    })

    it('splits the arguments at the ";" char', () => {
        const src = new URL('/test.jpg?width=300;400;500', 'file:///')

        const entries = extractParameterEntries(src)
        const asObject = Object.fromEntries(entries)

        expect(asObject).toHaveProperty('width', ['300', '400', '500'])
    })
})