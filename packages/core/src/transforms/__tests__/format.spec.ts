import { format } from '../format'
import { applyTransforms } from '../../index'
import { consoleLogger } from '../../lib/logger'
import { TransformFactoryContext } from '../../types'
import { join } from 'node:path'
import { toMatchFile } from 'jest-file-snapshot'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import sharp, { type FormatEnum, type Sharp } from 'sharp'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'

expect.extend({ toMatchFile, toMatchImageSnapshot })

describe('format', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "format"', () => {
    const res = format({ format: 'avif' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = format({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid format values are validated at runtime
      const throwingFn = () => format({ format: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid format value: "invalid", expected one of "heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k", "j2c" or "jxl", or "false" to disable'
      )
    })

    test('empty', () => {
      //@ts-expect-error an empty format is not a valid format value
      const throwingFn = () => format({ format: '' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid format value: "", expected one of "heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k", "j2c" or "jxl", or "false" to disable'
      )
    })

    test('false disables', () => {
      const res = format({ format: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const formats: Array<keyof FormatEnum> = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'webp', 'tiff', 'tif', 'jpe']

      for (const f of formats) {
        const res = format({ format: f }, dirCtx)

        expect(res).toBeInstanceOf(Function)
      }
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('webp', async () => {
      const { image } = await applyTransforms([format({ format: 'webp' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('jpg', async () => {
      const { image } = await applyTransforms([format({ format: 'jpg' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('jpeg', async () => {
      const { image } = await applyTransforms([format({ format: 'jpeg' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('png', async () => {
      const { image } = await applyTransforms([format({ format: 'png' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('avif', async () => {
      const { metadata } = await applyTransforms([format({ format: 'avif' }, dirCtx)!], img)

      expect(metadata.transforms).toHaveProperty('format', 'avif')
    })

    test('heif', async () => {
      const { metadata } = await applyTransforms([format({ format: 'heif' }, dirCtx)!], img)

      expect(metadata.transforms).toHaveProperty('format', 'heif')
    })

    test('tiff', async () => {
      const { image } = await applyTransforms([format({ format: 'tiff' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('jpeg w/ quality', async () => {
      const { image } = await applyTransforms([format({ format: 'jpeg', quality: '10' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('png w/ quality', async () => {
      const { image } = await applyTransforms([format({ format: 'png', quality: '10' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot({
        failureThreshold: 0.05,
        failureThresholdType: 'percent'
      })
    })

    test('webp w/ quality', async () => {
      const { image } = await applyTransforms([format({ format: 'webp', quality: '10' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('tiff w/ quality', async () => {
      const { image } = await applyTransforms([format({ format: 'tiff', quality: '10' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('avif w/ quality', async () => {
      const { metadata } = await applyTransforms([format({ format: 'avif', quality: '10' }, dirCtx)!], img)

      expect(metadata.transforms).toHaveProperty('format', 'avif')
    })

    test('heif w/ quality', async () => {
      const { metadata } = await applyTransforms([format({ format: 'heif', quality: '10' }, dirCtx)!], img)

      expect(metadata.transforms).toHaveProperty('format', 'heif')
    })

    test('jpeg w/ progressive', async () => {
      const { image } = await applyTransforms([format({ format: 'jpeg', progressive: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('png w/ progressive', async () => {
      const { image } = await applyTransforms([format({ format: 'png', progressive: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('webp w/ lossless', async () => {
      const { image } = await applyTransforms(
        [format({ format: 'webp', lossless: 'true', quality: '1' }, dirCtx)!],
        img
      )

      expect(await image.toBuffer()).toMatchFile()
    })

    test('png w/ effort', async () => {
      const { image } = await applyTransforms([format({ format: 'png', effort: '1' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot({
        failureThreshold: 0.05,
        failureThresholdType: 'percent'
      })
    })

    test('webp w/ effort', async () => {
      const { image } = await applyTransforms([format({ format: 'webp', effort: 'min' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })
  })
})
