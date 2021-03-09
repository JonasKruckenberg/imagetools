import { quality } from '../quality'

describe('quality', () => {
    it('returns null if the arg is smaller than 1', () => {
        const res = quality({ quality: '0' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is greater than 100', () => {
        const res = quality({ quality: '101' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is not a number', () => {
        const res = quality({ quality: 'test' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is not an integer', () => {
        const res = quality({ quality: '0.5' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if "quality" is missing', () => {
        const res = quality({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns null if the arg is empty', () => {
        const res = quality({ quality: '' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns a the quality as a number', () => {
        const res = quality({ quality: '10' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toEqual(10)
    })

    it('marks "quality" as used', () => {
        const usedParams = new Set()
        quality({ quality: '50' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('quality')).toBeTruthy()
    })

    it('add "quality" to the output metadata', () => {
        const metadata = new Map()
        quality({ quality: '60' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('quality')).toBeTruthy()
        expect(metadata.get('quality')).toEqual(60)
    })
})