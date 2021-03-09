import { flip } from '../flip'

describe('flip', () => {
    it('returns a function when flip is empty', () => {
        const res = flip({ flip: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flip is true', () => {
        const res = flip({ flip: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when flip is anything else', () => {
        const r1 = flip({ flip: 'null' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r1).toBeNull()

        const r2 = flip({ flip: 'anything else' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r2).toBeNull()
    })

    it('returns null if "flip" is missing', () => {
        const res = flip({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('marks "flip" as used', () => {
        const usedParams = new Set()
        flip({ flip: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flip')).toBeTruthy()
    })

    it('adds "flip" to the output metadata', () => {
        const metadata = new Map()
        flip({ flip: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flip')).toBeTruthy()
        expect(metadata.get('flip')).toEqual(true)
    })
})