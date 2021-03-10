import { flop } from '../flop'

describe('flop', () => {
    it('returns a function when flop is empty', () => {
        const res = flop({ flop: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flop is true', () => {
        const res = flop({ flop: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flop is anything else', () => {
        const r1 = flop({ flop: 'null' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r1).toBeNull()

        const r2 = flop({ flop: 'anything else' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(r2).toBeNull()
    })
    it('returns null if "flop" is missing', () => {
        const res = flop({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('marks "flop" as used', () => {
        const usedParams = new Set()
        flop({ flop: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flop')).toBeTruthy()
    })

    it('adds "flop" to the output metadata', () => {
        const metadata = new Map()
        flop({ flop: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flop')).toBeTruthy()
        expect(metadata.get('flop')).toEqual(true)
    })
})