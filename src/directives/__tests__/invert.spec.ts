import { invert } from '../invert'

describe('invert', () => {
    it('returns a function when invert is empty', () => {
        const res = invert({ invert: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when invert is true', () => {
        const res = invert({ invert: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when invert is anything else', () => {
        const r1 = invert({ invert: 'null' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r1).toBeNull()

        const r2 = invert({ invert: 'anything else' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r2).toBeNull()
    })

    it('returns null if "invert" is missing', () => {
        const res = invert({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('marks "invert" as used', () => {
        const usedParams = new Set()
        invert({ invert: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('invert')).toBeTruthy()
    })

    it('adds "invert" to the output metadata', () => {
        const metadata = new Map()
        invert({ invert: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('invert')).toBeTruthy()
        expect(metadata.get('invert')).toEqual(true)
    })
})