import { fit, FitValue } from "../fit"

describe('fit', () => {
    it('marks "fit" as used', () => {
        const usedParams = new Set()
        fit({ fit: 'cover' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('fit')).toBeTruthy()
    })

    it('adds "fit" the the output metadata', () => {
        const metadata = new Map()
        fit({ fit: 'cover' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('fit')).toBeTruthy()
        expect(metadata.get('fit')).toEqual('cover')
    })

    it('returns null if the arg is not in the whitelist', () => {
        //@ts-expect-error
        const res = fit({ fit: 'test' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('returns null if "fit" is missing', () => {
        const res = fit({}, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns whitelisted arguments', () => {
        const whitelist: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

        for (const keyword of whitelist) {
            const res = fit({ fit: keyword }, { useParam: jest.fn, setMetadata: jest.fn })
            expect(res).toEqual(keyword)
        }
    })
})