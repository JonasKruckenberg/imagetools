import { srcsetFormat } from '../output'

describe('srcsetFormat', () => {
    it('returns a valid srcset', () => {
        const src = new URL('test.jpg?srcset', 'file://')
        const outputMetadatas = [{ src: 'test.jpg', width: 300 }, { src: 'test.jpg', width: 400 }, { src: 'test.jpg', width: 700 }]

        const srcset = srcsetFormat(src, outputMetadatas)

        expect(srcset).toEqual('test.jpg 300w, test.jpg 400w, test.jpg 700w')
    })
    
    it('returns null when the srcset directive is missing', () => {
        const src = new URL('test.jpg', 'file://')
        const outputMetadatas = [{ src: 'test.jpg', width: 300 }, { src: 'test.jpg', width: 400 }, { src: 'test.jpg', width: 700 }]

        const res = srcsetFormat(src, outputMetadatas)

        expect(res).toBeNull()
    })
})