import { background } from '../background'

describe('background', () => {
    it('returns a string prefixed with "#"', () => {
        const res = background({ background: 'fff' }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toEqual('#fff')
    })

    it('returns null if "background" is missing', () => {
        const res = background({ }, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('marks the parameter as used', () => {
        const usedParams = new Set()
        background({ background: 'test' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('background')).toBeTruthy()
    })

    it('adds the background to the output metadata', () => {
        const metadata = new Map()
        background({ background: 'test' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('background')).toBeTruthy()
        expect(metadata.get('background')).toEqual('test')
    })
})