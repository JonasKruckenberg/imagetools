/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { format, FormatValue } from '../format'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'

expect.extend({ toMatchFile, toMatchImageSnapshot })

describe('format', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, warn: vi.fn }
  })

  test('keyword "format"', () => {
    const res = format({ format: 'avif' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = format({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('shorthands', () => {
    test('invalid', () => {
      const formats = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

      for (const f of formats) {
        const res = format({ [f]: 'invalid' }, dirCtx)

        expect(res).toBeUndefined()
      }
    })

    test('valid', () => {
      const formats = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

      for (const f of formats) {
        const res = format({ [f]: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
      }
    })
  })

  describe('arguments', () => {
    test('inavlid', () => {
      //@ts-expect-error invalid args
      const res = format({ format: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      //@ts-expect-error invalid args
      const res = format({ format: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const formats: FormatValue[] = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

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

      expect(metadata).toHaveProperty('format', 'avif')
    })

    test('heif', async () => {
      const { metadata } = await applyTransforms([format({ format: 'heif' }, dirCtx)!], img)

      expect(metadata).toHaveProperty('format', 'heif')
    })

    test('heic', async () => {
      const { metadata } = await applyTransforms([format({ format: 'heic' }, dirCtx)!], img)

      expect(metadata).toHaveProperty('format', 'heic')
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

      expect(metadata).toHaveProperty('format', 'avif')
    })

    test('heif w/ quality', async () => {
      const { metadata } = await applyTransforms([format({ format: 'heif', quality: '10' }, dirCtx)!], img)

      expect(metadata).toHaveProperty('format', 'heif')
    })

    test('jpeg w/ progressive', async () => {
      const { image } = await applyTransforms([format({ format: 'jpeg', progressive: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchFile()
    })

    test('png w/ progressive', async () => {
      const { image } = await applyTransforms([format({ format: 'png', progressive: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
