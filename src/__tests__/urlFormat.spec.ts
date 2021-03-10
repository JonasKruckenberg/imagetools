import { urlFormat } from '../output'

describe('srcsetFormat', () => {
    it('returns a string', () => {
        const src = new URL('test.jpg?srcset', 'file://')
        const outputMetadatas = [{ src: 'test.jpg', width: 300 }]

        const res = urlFormat(src, outputMetadatas)

        expect(res).toEqual('test.jpg')
    })

    it('returns an array of strings when multiple images have been generated', () => {
        const src = new URL('test.jpg?srcset', 'file://')
        const outputMetadatas = [{ src: '1.jpg', width: 300 }, { src: '2.jpg', width: 500 }, { src: '3.jpg', width: 700 }]

        const res = urlFormat(src, outputMetadatas)

        expect(res).toBeInstanceOf(Array)
        expect(res[0]).toEqual('1.jpg')
        expect(res[1]).toEqual('2.jpg')
        expect(res[2]).toEqual('3.jpg')
    })

    it('returns a string even without any directive', () => {
        const src = new URL('test.jpg', 'file://')
        const outputMetadatas = [{ src: 'test.jpg', width: 300 }]

        const res = urlFormat(src, outputMetadatas)

        expect(res).toEqual('test.jpg')
    })
})