import { median } from '../median'

describe('median', () => {
    it('returns a function when the argument is a number', () => {
        const res = median({ median: '3' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns null when the argument is invalid', () => {
        const res = median({ median: 'foobar' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })
    it('returns null when the parameter is missing', () => {
        const res = median({}, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })
    it('marks the parameter as used', () => {
        const usedParams = new Set()
        median({ median: '3' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('median')).toBeTruthy()
    })
    it('adds the parameter to the output metadata', () => {
        const metadata = new Map()
        median({ median: '3' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('median')).toBeTruthy()
        expect(metadata.get('median')).toEqual(3)
    })
})