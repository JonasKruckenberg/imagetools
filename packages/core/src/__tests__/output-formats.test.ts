import { urlFormat, metadataFormat, imgFormat, pictureFormat, srcsetFormat } from '../output-formats'
import { describe, test, expect } from 'vitest'

describe('url format', () => {
  test('single image', () => {
    const output = urlFormat()([{ src: '/foo.jpg' }])

    expect(output).toEqual('/foo.jpg')
  })

  test('multiple images', () => {
    const output = urlFormat()([{ src: '/foo.jpg' }, { src: '/bar.jpg' }])

    expect(output).toStrictEqual(['/foo.jpg', '/bar.jpg'])
  })
})

describe('metadata format', () => {
  test('single image', () => {
    const output = metadataFormat()([{ src: '/foo.jpg', foo: 'bar', number: 1 }])

    expect(output).toStrictEqual({ src: '/foo.jpg', foo: 'bar', number: 1 })
  })

  test('multiple images', () => {
    const output = metadataFormat()([
      { src: '/foo.jpg', foo: 'bar', number: 1 },
      { src: '/bar.jpg', hello: 'world', number: 2 }
    ])

    expect(output).toStrictEqual([
      { src: '/foo.jpg', foo: 'bar', number: 1 },
      { src: '/bar.jpg', hello: 'world', number: 2 }
    ])
  })

  test('whitelist', () => {
    const output = metadataFormat(['src', 'number'])([
      { src: '/foo.jpg', foo: 'bar', number: 1 },
      { src: '/bar.jpg', hello: 'world', number: 2 }
    ])

    expect(output).toStrictEqual([
      { src: '/foo.jpg', number: 1 },
      { src: '/bar.jpg', number: 2 }
    ])
  })
})

describe('image format', () => {
  test('single image', () => {
    const output = imgFormat()([{ src: '/foo.webp', format: 'webp', width: 100, height: 50 }])

    expect(output).toStrictEqual({
      src: '/foo.webp',
      w: 100,
      h: 50
    })
  })

  test('multiple image sizes', () => {
    const output = imgFormat()([
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50 },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25 }
    ])

    expect(output).toStrictEqual({
      srcset: '/foo-100.webp 100w, /foo-50.webp 50w',
      src: '/foo-100.webp',
      w: 100,
      h: 50
    })
  })
})

describe('picture format', () => {
  test('multiple image formats', () => {
    const output = pictureFormat()([
      { src: '/foo.avif', format: 'avif', width: 100, height: 50 },
      { src: '/foo.webp', format: 'webp', width: 100, height: 50 },
      { src: '/foo.jpg', format: 'jpg', width: 100, height: 50 }
    ])

    expect(output).toStrictEqual({
      sources: {
        avif: '/foo.avif 100w',
        webp: '/foo.webp 100w'
      },
      img: {
        src: '/foo.jpg',
        w: 100,
        h: 50
      }
    })
  })

  test('multiple image formats and sizes', () => {
    const output = pictureFormat()([
      { src: '/foo-100.avif', format: 'avif', width: 100, height: 50 },
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50 },
      { src: '/foo-100.jpg', format: 'jpg', width: 100, height: 50 },
      { src: '/foo-50.avif', format: 'avif', width: 50, height: 25 },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25 },
      { src: '/foo-50.jpg', format: 'jpg', width: 50, height: 25 }
    ])

    expect(output).toStrictEqual({
      sources: {
        avif: '/foo-100.avif 100w, /foo-50.avif 50w',
        webp: '/foo-100.webp 100w, /foo-50.webp 50w',
        jpeg: '/foo-100.jpg 100w, /foo-50.jpg 50w'
      },
      img: {
        src: '/foo-100.jpg',
        w: 100,
        h: 50
      }
    })
  })
})

describe('srcset format', () => {
  test('single image', () => {
    const output = srcsetFormat()([{ src: '/foo.jpg', width: 500 }])

    expect(output).toEqual('/foo.jpg 500w')
  })

  test('multiple images', () => {
    const output = srcsetFormat()([
      { src: '/foo.jpg', width: 500 },
      { src: '/bar.jpg', width: 300 }
    ])

    expect(output).toEqual('/foo.jpg 500w, /bar.jpg 300w')
  })
})
