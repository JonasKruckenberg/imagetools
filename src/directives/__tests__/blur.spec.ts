import { blur } from '../blur'

describe('blur', () => {
    it('returns null if the arg is smaller than 0.3', () => {
        const res = blur({ blur: '0.1' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is greater than 1000', () => {
        const res1 = blur({ blur: '1001' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res1).toBeNull()

        const res2 = blur({ blur: '2035' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res2).toBeNull()
    })

    it('returns null if the arg is not a number', () => {
        const res = blur({ blur: 'test' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if "blur" is missing', () => {
        const res = blur({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns a function', () => {
        const res = blur({ blur: '10' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if the arg is empty', () => {
        const res = blur({ blur: '' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if the arg is "true"', () => {
        const res = blur({ blur: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeInstanceOf(Function)
    })

    it('marks "blur" as used', () => {
        const usedParams = new Set()
        blur({ blur: 'true' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('blur')).toBeTruthy()
    })

    it('add "blur" to the output metadata', () => {
        const m1 = new Map()
        blur({ blur: 'true' }, { useParam: jest.fn, setMetadata: (k, v) => m1.set(k, v) })

        expect(m1.has('blur')).toBeTruthy()
        expect(m1.get('blur')).toEqual(true)

        const m2 = new Map()
        blur({ blur: '0.5' }, { useParam: jest.fn, setMetadata: (k, v) => m2.set(k, v) })

        expect(m2.has('blur')).toBeTruthy()
        expect(m2.get('blur')).toEqual(0.5)
    })
})