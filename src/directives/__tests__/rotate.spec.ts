import { rotate } from '../rotate'

describe('rotate', () => {
    it('returns null if the arg is not a number', () => {
        const res = rotate({ rotate: 'test' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is not an integer', () => {
        const res = rotate({ rotate: '0.5' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeInstanceOf(Function)
    })

    it('returns null if "rotate" is missing', () => {
        const res = rotate({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is empty', () => {
        const res = rotate({ rotate: '' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns a the rotate as a number', () => {
        const res = rotate({ rotate: '10' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeInstanceOf(Function)
    })

    it('marks "rotate" as used', () => {
        const usedParams = new Set()
        rotate({ rotate: '50' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('rotate')).toBeTruthy()
    })

    it('add "rotate" to the output metadata', () => {
        const metadata = new Map()
        rotate({ rotate: '60' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('rotate')).toBeTruthy()
        expect(metadata.get('rotate')).toEqual(60)
    })
})