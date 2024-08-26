import { urlFormat, metadataFormat, imgFormat, pictureFormat, lqipPictureFormat, srcsetFormat } from '../output-formats'
import { describe, test, expect } from 'vitest'
import sharp from 'sharp'
import { join } from 'path'

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

  test('multiple image formats and sizes with low quality inplace picture', async () => {
    const image = sharp(join(__dirname, './__fixtures__/with-metadata-lqip.png'))
    const output = await lqipPictureFormat()([
      { src: '/foo-100.avif', format: 'avif', width: 100, height: 50 },
      { src: '/foo-100.webp', format: 'webp', width: 100, height: 50 },
      { src: '/foo-100.jpg', format: 'jpg', width: 100, height: 50 },
      { src: '/foo-50.avif', format: 'avif', width: 50, height: 25 },
      { src: '/foo-50.webp', format: 'webp', width: 50, height: 25 },
      { src: '/foo-50.jpg', format: 'jpg', width: 50, height: 25 },
      { src: '/foo-10.avif', format: 'avif', width: 10, height: 5, image },
      { src: '/foo-10.webp', format: 'webp', width: 10, height: 5, image },
      { src: '/foo-10.jpg', format: 'jpg', width: 10, height: 5, image }
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
      },
      lqip: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAABuvAAAbrwFeGpEcAAABHklEQVR4nAXBjU6CQAAA4NuaZoGHnAcccN0hBx4HIalgYZr9TavNbKvWnDWz93+Ivg9Y0qBjyxLQ6DR9R5sUrC6VFCgJYa4wcHNiS+QTSD1NCay4xd22CszpuK+ECZys653joAeFZ+R9GhM4kl6V9xZ1niUuwMGxy/TA1gOzkTGzEDTldn0RzcrkaihB127F3KJY+9uu1o9VWajDfvd0P5mP+tPUAwTr1NYpgS/L+U0lI25XRVwkbDqMSuUD0tVCisx2I2I45paDtOsqPey/n5d3kmGAO60kdMsiUcL9fN9sXtfb3e/yYREyJ+YIQOMoi/231ezMw7ezSVlWq/Xu4+unvhxkYw5Ir0nJST3gHb0JTxsY6cRGXBA5ZG5q/gN38SygSTScDwAAAABJRU5ErkJggg=='
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
