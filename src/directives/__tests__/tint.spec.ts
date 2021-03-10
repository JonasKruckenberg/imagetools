import { tint } from '../tint'

describe('tint', () => {
    it('returns a function when the argument is a string', () => {
        const res = tint({ tint: '#fff' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when the parameter is missing', () => {
        const res = tint({}, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('marks the parameter as used', () => {
        const usedParams = new Set()
        tint({ tint: '#fff' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('tint')).toBeTruthy()
    })

    it('adds tint to the output metadata', () => {
        const metadata = new Map()
        tint({ tint: '#fff' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('tint')).toBeTruthy()
        expect(metadata.get('tint')).toEqual('#fff')
    })
})