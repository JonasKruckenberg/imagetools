import { metadataFormat } from '../output'

describe('metadataFormat', () => {
    it('returns an object when the "metadata" directive is present', () => {
        const src = new URL('test.jpg?metadata', 'file://')
        const outputMetadatas = [{ src: '1.jpg' }]

        const res = metadataFormat(src, outputMetadatas)

        expect(res).toBeInstanceOf(Object)
    })

    it('returns an object when the "meta" directive is present', () => {
        const src = new URL('test.jpg?meta', 'file://')
        const outputMetadatas = [{ src: '1.jpg' }]

        const res = metadataFormat(src, outputMetadatas)

        expect(res).toBeInstanceOf(Object)
    })

    it('return null otherwise', () => {
        const src = new URL('test.jpg', 'file://')
        const outputMetadatas = [{ src: '1.jpg' }]

        const res = metadataFormat(src, outputMetadatas)

        expect(res).toBeNull()
    })

    it('returns all output metadata', () => {
        const src = new URL('test.jpg?meta', 'file://')
        const outputMetadatas = [{ src: '1.jpg', foo: 'bar', hello: 'world' }]

        const res = metadataFormat(src, outputMetadatas)

        expect(res).toHaveProperty('src', '1.jpg')
        expect(res).toHaveProperty('foo', 'bar')
        expect(res).toHaveProperty('hello', 'world')
    })

    it('returns an array of objects when multiple images have been generated', () => {
        const src = new URL('test.jpg?meta', 'file://')
        const outputMetadatas = [{ src: '1.jpg' }, { src: '3.jpg' }, { src: '3.jpg' }]

        const res = metadataFormat(src, outputMetadatas)

        expect(res).toBeInstanceOf(Array)
        expect(res).toHaveLength(3)
    })
})