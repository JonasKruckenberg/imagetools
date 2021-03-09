import { format, ImageFormat } from '../format'

describe('format', () => {
    it('marks "format" as used', () => {
        const usedParams = new Set()
        format({ format: 'webp' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('format')).toBeTruthy()
    })

    it('marks the shorthands as used', () => {
        const formats: ImageFormat[] = ['avif', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'heif', 'heic', 'gif']

        for (const f of formats) {
            const usedParams = new Set()
            format({ [f]: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

            expect(usedParams.has(f)).toBeTruthy()
        }
    })

    it('add "format" to the output metadata', () => {
        const metadata = new Map()

        format({ format: 'avif' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('format')).toBeTruthy()
        expect(metadata.get('format')).toEqual('avif')
    })

    it('returns null if the arg is not a valid format', () => {
        const res = format({ format: 'nothing' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('returns null if "format" is missing', () => {
        const res = format({}, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })
})