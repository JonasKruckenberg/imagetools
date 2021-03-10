import { flatten } from '../flatten'

describe('flatten', () => {
    it('returns a function when the argument is empty', () => {
        const res = flatten({ flatten: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when the argument is true', () => {
        const res = flatten({ flatten: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when "flatten" is missing', () => {
        //@ts-expect-error
        const res = flatten({ flatten: 'invalid' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('marks the "flatten" parameter as used', () => {
        const usedParams = new Set()
        flatten({ flatten: 'true' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flatten')).toBeTruthy()
    })

    it('add "flatten" to the output metadata', () => {
        const metadata = new Map()
        flatten({ flatten: 'true' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flatten')).toBeTruthy()
        expect(metadata.get('flatten')).toEqual(true)
    })

    it('uses the "background" directive', () => {
        const metadata = new Map()
        flatten({ flatten: 'true', background: '#fff' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('background')).toBeTruthy()
        expect(metadata.get('background')).toEqual('#fff')
    })
})