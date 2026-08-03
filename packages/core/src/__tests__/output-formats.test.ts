import { urlFormat, metadataFormat, imgFormat, pictureFormat, srcsetFormat } from '../output-formats'
import type { Metadata, ProcessedImage, AppliedTransforms } from '../types'
import { describe, test, expect } from 'vitest'

function meta(
  src: string,
  width: number,
  height = width,
  format?: string,
  config: Record<string, string> = {},
  raw: Partial<Metadata> = {},
  transforms: Partial<AppliedTransforms> = {}
): ProcessedImage {
  return {
    src,
    info: { width, height, autoOriented: { width, height } },
    transforms: { format, ...transforms },
    config,
    sharpMetadata: {
      format,
      width,
      height,
      autoOrient: { width, height },
      space: 'srgb',
      channels: 3,
      depth: 'uchar',
      isProgressive: false,
      hasProfile: false,
      hasAlpha: false,
      ...raw
    } as Metadata
    // @ts-expect-error image is not needed for these output formats
  } as ProcessedImage
}

describe('url format', () => {
  test('single image', () => {
    const output = urlFormat()([meta('/foo.jpg', 100)])

    expect(output).toEqual('/foo.jpg')
  })

  test('multiple images', () => {
    const output = urlFormat()([meta('/foo.jpg', 100), meta('/bar.jpg', 100)])

    expect(output).toStrictEqual(['/foo.jpg', '/bar.jpg'])
  })
})

describe('metadata format', () => {
  test('single image', () => {
    const output = metadataFormat()([
      meta('/foo.jpg', 100, 50, 'jpg', {}, { space: 'srgb', channels: 3, depth: 'uchar' })
    ])

    expect(output).toMatchObject({
      src: '/foo.jpg',
      width: 100,
      height: 50,
      format: 'jpg',
      space: 'srgb',
      channels: 3,
      depth: 'uchar',
      isProgressive: false,
      hasProfile: false,
      hasAlpha: false
    })
    expect(output).not.toHaveProperty('config')
  })

  test('multiple images', () => {
    const output = metadataFormat()([meta('/foo.jpg', 100, 50, 'jpg'), meta('/bar.jpg', 200, 100, 'webp')])

    expect(output).toStrictEqual([
      expect.objectContaining({ src: '/foo.jpg', width: 100, height: 50, format: 'jpg' }),
      expect.objectContaining({ src: '/bar.jpg', width: 200, height: 100, format: 'webp' })
    ])
  })

  test('includes the values threaded through the transforms', () => {
    const output = metadataFormat()([
      meta('/foo.jpg', 300, 150, 'webp', {}, {}, { flip: true, quality: 80, rotate: 90, tint: '#ff0000', fit: 'cover' })
    ])

    expect(output).toMatchObject({
      src: '/foo.jpg',
      width: 300,
      height: 150,
      format: 'webp',
      flip: true,
      quality: 80,
      rotate: 90,
      tint: '#ff0000',
      fit: 'cover'
    })
  })

  test('whitelist', () => {
    const output = metadataFormat(['src', 'width'])([meta('/foo.jpg', 100), meta('/bar.jpg', 200)])

    expect(output).toStrictEqual([
      { width: 100, src: '/foo.jpg' },
      { width: 200, src: '/bar.jpg' }
    ])
  })
})

describe('image format', () => {
  test('single image', () => {
    const output = imgFormat()([meta('/foo.webp', 100, 50, 'webp')])

    expect(output).toStrictEqual({
      src: '/foo.webp',
      w: 100,
      h: 50
    })
  })

  test('multiple image sizes', () => {
    const output = imgFormat()([meta('/foo-100.webp', 100, 50, 'webp'), meta('/foo-50.webp', 50, 25, 'webp')])

    expect(output).toStrictEqual({
      srcset: '/foo-100.webp 100w, /foo-50.webp 50w',
      src: '/foo-100.webp',
      w: 100,
      h: 50
    })
  })

  test('multiple image sizes with pixel density descriptors', () => {
    const output = imgFormat()([
      meta('/foo-100.webp', 100, 50, 'webp', { basePixels: '100' }),
      meta('/foo-50.webp', 50, 25, 'webp', { basePixels: '100' })
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
  test('throws when the format is missing', () => {
    expect(() => pictureFormat()([meta('/foo.jpg', 100, 50)])).toThrow('Could not determine image format')
  })

  test('multiple image formats', () => {
    const output = pictureFormat()([
      meta('/foo.avif', 100, 50, 'avif'),
      meta('/foo.webp', 100, 50, 'webp'),
      meta('/foo.jpg', 100, 50, 'jpg')
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
      meta('/foo-100.avif', 100, 50, 'avif'),
      meta('/foo-100.webp', 100, 50, 'webp'),
      meta('/foo-100.jpg', 100, 50, 'jpg'),
      meta('/foo-50.avif', 50, 25, 'avif'),
      meta('/foo-50.webp', 50, 25, 'webp'),
      meta('/foo-50.jpg', 50, 25, 'jpg')
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
      meta('/foo-100.avif', 100, 50, 'avif', { basePixels: '100' }),
      meta('/foo-100.webp', 100, 50, 'webp', { basePixels: '100' }),
      meta('/foo-100.jpg', 100, 50, 'jpg', { basePixels: '100' }),
      meta('/foo-50.avif', 50, 25, 'avif', { basePixels: '100' }),
      meta('/foo-50.webp', 50, 25, 'webp', { basePixels: '100' }),
      meta('/foo-50.jpg', 50, 25, 'jpg', { basePixels: '100' })
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
    const output = srcsetFormat()([meta('/foo.jpg', 500)])

    expect(output).toEqual('/foo.jpg 500w')
  })

  test('multiple images', () => {
    const output = srcsetFormat()([meta('/foo.jpg', 500), meta('/bar.jpg', 300)])

    expect(output).toEqual('/foo.jpg 500w, /bar.jpg 300w')
  })

  test('uses pixel density descriptors when basePixels is set', () => {
    const output = srcsetFormat()([
      meta('/foo.jpg', 300, 300, undefined, { basePixels: '300' }),
      meta('/bar.jpg', 600, 600, undefined, { basePixels: '300' })
    ])

    expect(output).toEqual('/foo.jpg 1x, /bar.jpg 2x')
  })

  test('falls back to width descriptors when basePixels is not a positive number', () => {
    const output = srcsetFormat()([
      meta('/foo.jpg', 500, 500, undefined, { basePixels: '0' }),
      meta('/bar.jpg', 500, 500, undefined, { basePixels: 'abc' })
    ])

    expect(output).toEqual('/foo.jpg 500w, /bar.jpg 500w')
  })
})
