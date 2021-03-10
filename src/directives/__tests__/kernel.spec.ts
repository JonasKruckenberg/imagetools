import { kernel, KernelValue } from "../kernel"

describe('kernel', () => {
    it('marks "kernel" as used', () => {
        const usedParams = new Set()
        kernel({ kernel: 'cubic' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('kernel')).toBeTruthy()
    })

    it('adds "kernel" the the output metadata', () => {
        const metadata = new Map()
        kernel({ kernel: 'cubic' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('kernel')).toBeTruthy()
        expect(metadata.get('kernel')).toEqual('cubic')
    })

    it('returns null if the arg is not in the whitelist', () => {
        //@ts-expect-error
        const res = kernel({ kernel: 'test' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('returns null if "kernel" is missing', () => {
        const res = kernel({}, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })

    it('returns whitelisted arguments', () => {
        const whitelist: KernelValue[] = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3']

        for (const keyword of whitelist) {
            const res = kernel({ kernel: keyword }, { useParam: jest.fn, setMetadata: jest.fn })
            expect(res).toEqual(keyword)
        }
    })
})