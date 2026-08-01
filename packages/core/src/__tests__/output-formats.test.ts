import { urlFormat, metadataFormat, imgFormat, pictureFormat, srcsetFormat } from '../output-formats'
import { describe, test, expect } from 'vitest'

describe('url format', () => {
  test('single image', () => {
    const output = urlFormat()([{ src: '/foo.jpg', config: {} }])

    expect(output).toEqual('/foo.jpg')
  })

  test('multiple images', () => {
    const output = urlFormat()([
      { src: '/foo.jpg', config: {} },
      { src: '/bar.jpg', config: {} }
    ])

    expect(output).toStrictEqual(['/foo.jpg', '/bar.jpg'])
  })
})

describe('metadata format', () => {
  test('single image', () => {
    const output = metadataFormat()([{ src: '/foo.jpg', foo: 'bar', number: 1, config: {} }])

    expect(output).toStrictEqual({ src: '/foo.jpg', foo: 'bar', number: 1 })
  })

  test('multiple images', () => {
    const output = metadataFormat()([
      { src: '/foo.jpg', foo: 'bar', number: 1, config: {} },
      { src: '/bar.jpg', hello: 'world', number: 2, config: {} }
    ])

    expect(output).toStrictEqual([
      { src: '/foo.jpg', foo: 'bar', number: 1 },
      { src: '/bar.jpg', hello: 'world', number: 2 }
    ])
  })

  test('whitelist', () => {
    const output = metadataFormat(['src', 'number'])([
      { src: '/foo.jpg', foo: 'bar', number: 1, config: {} },
      { src: '/bar.jpg', hello: 'world', number: 2, config: {} }
    ])

    expect(output).toStrictEqual([
      { src: '/foo.jpg', number: 1 },
      { src: '/bar.jpg', number: 2 }
    ])
  })
})

describe('image format', () => {
  test('single image', () => {
    const output = imgFormat()([{ src: '/foo.webp', format: 'webp', width: 100, height: 50, config: {} }])

    expect(output).toStrictEqual({
      src: '/foo.webp',
      w: 100,
      h: 50
    })
  })

  test('multiple image sizes', () => {
    const output = imgFormat()([
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50, config: {} },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25, config: {} }
    ])

    expect(output).toStrictEqual({
      srcset: '/foo-100.webp 100w, /foo-50.webp 50w',
      src: '/foo-100.webp',
      w: 100,
      h: 50
    })
  })

  test('multiple image sizes with pixel density descriptors', () => {
    const output = imgFormat()([
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50, config: { basePixels: '100' } },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25, config: { basePixels: '100' } }
    ])

    expect(output).toStrictEqual({
      srcset: '/foo-100.webp 1x, /foo-50.webp 0.5x',
      src: '/foo-100.webp',
      w: 100,
      h: 50
    })
  })
})

describe('picture format', () => {
  test('multiple image formats', () => {
    const output = pictureFormat()([
      { src: '/foo.avif', format: 'avif', width: 100, height: 50, config: {} },
      { src: '/foo.webp', format: 'webp', width: 100, height: 50, config: {} },
      { src: '/foo.jpg', format: 'jpg', width: 100, height: 50, config: {} }
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
      { src: '/foo-100.avif', format: 'avif', width: 100, height: 50, config: {} },
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50, config: {} },
      { src: '/foo-100.jpg', format: 'jpg', width: 100, height: 50, config: {} },
      { src: '/foo-50.avif', format: 'avif', width: 50, height: 25, config: {} },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25, config: {} },
      { src: '/foo-50.jpg', format: 'jpg', width: 50, height: 25, config: {} }
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

  test('multiple image formats and sizes with pixel density descriptors', () => {
    const output = pictureFormat()([
      { src: '/foo-100.avif', format: 'avif', width: 100, height: 50, config: { basePixels: '100' } },
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50, config: { basePixels: '100' } },
      { src: '/foo-100.jpg', format: 'jpg', width: 100, height: 50, config: { basePixels: '100' } },
      { src: '/foo-50.avif', format: 'avif', width: 50, height: 25, config: { basePixels: '100' } },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25, config: { basePixels: '100' } },
      { src: '/foo-50.jpg', format: 'jpg', width: 50, height: 25, config: { basePixels: '100' } }
    ])

    expect(output).toStrictEqual({
      sources: {
        avif: '/foo-100.avif 1x, /foo-50.avif 0.5x',
        webp: '/foo-100.webp 1x, /foo-50.webp 0.5x',
        jpeg: '/foo-100.jpg 1x, /foo-50.jpg 0.5x'
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
    const output = srcsetFormat()([{ src: '/foo.jpg', width: 500, config: {} }])

    expect(output).toEqual('/foo.jpg 500w')
  })

  test('multiple images', () => {
    const output = srcsetFormat()([
      { src: '/foo.jpg', width: 500, config: {} },
      { src: '/bar.jpg', width: 300, config: {} }
    ])

    expect(output).toEqual('/foo.jpg 500w, /bar.jpg 300w')
  })

  test('uses pixel density descriptors when basePixels is set', () => {
    const output = srcsetFormat()([
      { src: '/foo.jpg', width: 300, config: { basePixels: '300' } },
      { src: '/bar.jpg', width: 600, config: { basePixels: '300' } }
    ])

    expect(output).toEqual('/foo.jpg 1x, /bar.jpg 2x')
  })

  test('falls back to width descriptors when basePixels is not a positive number', () => {
    const output = srcsetFormat()([
      { src: '/foo.jpg', width: 500, config: { basePixels: '0' } },
      { src: '/bar.jpg', width: 500, config: { basePixels: 'abc' } }
    ])

    expect(output).toEqual('/foo.jpg 500w, /bar.jpg 500w')
  })
})
