import { hsb } from '../hsb'

describe('hsb', () => {
    it('returns null if all parameters are missing', () => {
        const res = hsb({}, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('returns a function if all parameters are present', () => {
        const usedParams = new Set()
        const metadata = new Map()
        const res = hsb({ hue: '20', saturation: '20', brightness: '20' }, { useParam: k => usedParams.add(k), setMetadata: (k,v) => metadata.set(k,v) })

        expect(res).toBeInstanceOf(Function)
        expect(usedParams.has('hue')).toBeTruthy()
        expect(usedParams.has('saturation')).toBeTruthy()
        expect(usedParams.has('brightness')).toBeTruthy()
        expect(metadata.get('hue')).toEqual(20)
        expect(metadata.get('saturation')).toEqual(20)
        expect(metadata.get('brightness')).toEqual(20)
    })

    it('returns a function if some parameters are present', () => {
        {
            const usedParams = new Set()
            const metadata = new Map()
            const res = hsb({ hue: '20', saturation: '20' }, { useParam: k => usedParams.add(k), setMetadata: (k,v) => metadata.set(k,v) })

            expect(res).toBeInstanceOf(Function)
            expect(usedParams.has('hue')).toBeTruthy()
            expect(usedParams.has('saturation')).toBeTruthy()
            expect(usedParams.has('brightness')).toBeFalsy()
            expect(metadata.get('hue')).toEqual(20)
            expect(metadata.get('saturation')).toEqual(20)
        }
        {
            const usedParams = new Set()
            const metadata = new Map()
            const res = hsb({ hue: '20', brightness: '20' }, { useParam: k => usedParams.add(k), setMetadata: (k,v) => metadata.set(k,v) })

            expect(res).toBeInstanceOf(Function)
            expect(usedParams.has('hue')).toBeTruthy()
            expect(usedParams.has('saturation')).toBeFalsy()
            expect(usedParams.has('brightness')).toBeTruthy()
            expect(metadata.get('hue')).toEqual(20)
            expect(metadata.get('brightness')).toEqual(20)
        }
        {
            const usedParams = new Set()
            const metadata = new Map()
            const res = hsb({ saturation: '20', brightness: '20' }, { useParam: k => usedParams.add(k), setMetadata: (k,v) => metadata.set(k,v) })

            expect(res).toBeInstanceOf(Function)
            expect(usedParams.has('hue')).toBeFalsy()
            expect(usedParams.has('saturation')).toBeTruthy()
            expect(usedParams.has('brightness')).toBeTruthy()
            expect(metadata.get('saturation')).toEqual(20)
            expect(metadata.get('brightness')).toEqual(20)
        }
    })

    describe('hue', () => {
        it('returns a function when "hue" an integer', () => {
            const res = hsb({ hue: '20' }, { useParam: jest.fn, setMetadata: jest.fn })

            expect(res).toBeInstanceOf(Function)
        })

        it('marks hue as used', () => {
            const usedParams = new Set()
            hsb({ hue: '20' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

            expect(usedParams.has('hue')).toBeTruthy()
        })

        it('adds hue to the output metadata', () => {
            const metadata = new Map()
            hsb({ hue: '20' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

            expect(metadata.has('hue')).toBeTruthy()
            expect(metadata.get('hue')).toEqual(20)
        })

        it('returns null if the argument is invalid', () => {
            const res = hsb({ hue: 'invalid' }, { useParam: jest.fn, setMetadata: jest.fn })

            expect(res).toBeNull()
        })
    })

    describe('saturation', () => {
        it('returns a function when saturation is a number', () => {
            const res = hsb({ saturation: '20' }, { useParam: jest.fn, setMetadata: jest.fn })

            expect(res).toBeInstanceOf(Function)
        })
        it('marks saturation as used', () => {
            const usedParams = new Set()
            hsb({ saturation: '20' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

            expect(usedParams.has('saturation')).toBeTruthy()
        })
        it('adds saturation to the output metadata', () => {
            const metadata = new Map()
            hsb({ saturation: '20' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

            expect(metadata.has('saturation')).toBeTruthy()
            expect(metadata.get('saturation')).toEqual(20)
        })
    })

    describe('brightness', () => {
        it('returns a function when brightness is a number', () => {
            const res = hsb({ brightness: '20' }, { useParam: jest.fn, setMetadata: jest.fn })

            expect(res).toBeInstanceOf(Function)
        })
        it('marks brightness as used', () => {
            const usedParams = new Set()
            hsb({ brightness: '20' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

            expect(usedParams.has('brightness')).toBeTruthy()
        })
        it('adds brightness to the output metadata', () => {
            const metadata = new Map()
            hsb({ brightness: '20' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

            expect(metadata.has('brightness')).toBeTruthy()
            expect(metadata.get('brightness')).toEqual(20)
        })
    })
})