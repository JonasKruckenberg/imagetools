import { urlFormat, metadataFormat, srcsetFormat } from '../output-formats'

describe('url format', () => {
    test('single image', () => {
        const output = urlFormat([{ src: '/foo.jpg' }])

        expect(output).toEqual('/foo.jpg')
    })

    test('multiple images', () => {
        const output = urlFormat([{ src: '/foo.jpg' }, { src: '/bar.jpg' }])

        expect(output).toStrictEqual(['/foo.jpg', '/bar.jpg'])
    })
})

describe('metadata format', () => {
    test('single image', () => {
        const output = metadataFormat([{ src: '/foo.jpg', foo: 'bar', number: 1 }])

        expect(output).toStrictEqual({ src: '/foo.jpg', foo: 'bar', number: 1 })
    })

    test('multiple images', () => {
        const output = metadataFormat([{ src: '/foo.jpg', foo: 'bar', number: 1 }, { src: '/bar.jpg', hello: 'world', number: 2 }])

        expect(output).toStrictEqual([{ src: '/foo.jpg', foo: 'bar', number: 1 }, { src: '/bar.jpg', hello: 'world', number: 2 }])
    })
})

describe('srcset format', () => {
    test('single image', () => {
        const output = srcsetFormat([{ src: '/foo.jpg', width: 500 }])

        expect(output).toEqual('/foo.jpg 500w')
    })

    test('multiple images', () => {
        const output = srcsetFormat([{ src: '/foo.jpg', width: 500 }, { src: '/bar.jpg', width: 300 }])

        expect(output).toEqual('/foo.jpg 500w, /bar.jpg 300w')
    })
})