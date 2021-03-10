import { normalize } from '../normalize'

describe('normalize', () => {
    it('returns a function when normalize is empty', () => {
        const res = normalize({ normalize: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when normalize is true', () => {
        const res = normalize({ normalize: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when normalize is anything else', () => {
        const r1 = normalize({ normalize: 'null' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r1).toBeNull()

        const r2 = normalize({ normalize: 'anything else' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r2).toBeNull()
    })

    it('returns null if "normalize" is missing', () => {
        const res = normalize({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('marks "normalize" as used', () => {
        const usedParams = new Set()
        normalize({ normalize: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('normalize')).toBeTruthy()
    })

    it('adds "normalize" to the output metadata', () => {
        const metadata = new Map()
        normalize({ normalize: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('normalize')).toBeTruthy()
        expect(metadata.get('normalize')).toEqual(true)
    })
})