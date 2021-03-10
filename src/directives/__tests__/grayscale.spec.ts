import { grayscale } from '../grayscale'

describe('grayscale', () => {
    it('returns a function when the argument is empty', () => {
        const res = grayscale({ grayscale: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function when the argument is true', () => {
        const res = grayscale({ grayscale: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns null when the argument is invalid', () => {
        const res = grayscale({ grayscale: 'invalid' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })
    it('marks the parameter as used', () => {
        const usedParams = new Set()
        grayscale({ grayscale: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('grayscale')).toBeTruthy()
    })
    it('add "grayscale" to the output metadata', () => {
        const metadata = new Map()
        grayscale({ grayscale: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('grayscale')).toBeTruthy()
        expect(metadata.get('grayscale')).toEqual(true)
    })
})