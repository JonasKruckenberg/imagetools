import { autoOrient } from '../autoOrient'
import { resize } from '../resize'
import { applyTransforms } from '../../index'
import { consoleLogger } from '../../lib/logger'
import { TransformFactoryContext } from '../../types'
import { join } from 'node:path'
import { toMatchFile } from 'jest-file-snapshot'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import sharp, { type Sharp } from 'sharp'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'

expect.extend({ toMatchFile, toMatchImageSnapshot })

describe('autoOrient', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = {
      // @ts-expect-error vi.fn works fine
      useParam: vi.fn,
      manualSearchParams: new URLSearchParams(),
      logger: consoleLogger
    }
  })

  test('keyword "noAutoOrient"', () => {
    const res = autoOrient({ noAutoOrient: 'true' }, dirCtx)

    expect(res).toBeUndefined()
  })

  test('missing', () => {
    const res = autoOrient({}, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  describe('arguments', () => {
    test('invalid', () => {
      // @ts-expect-error invalid args
      const throwingFn = () => autoOrient({ noAutoOrient: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow()
    })

    test('empty', () => {
      const res = autoOrient({ noAutoOrient: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('true', () => {
      const res = autoOrient({ noAutoOrient: 'true' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('false', () => {
      const res = autoOrient({ noAutoOrient: 'false' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/Landscape_5.jpg'))
    })

    test('autoOrient (no opt-out)', async () => {
      const metadataBefore = await img.metadata()
      expect(metadataBefore).toHaveProperty('orientation', 5)

      const { image } = await applyTransforms([autoOrient({}, dirCtx)!], img)

      const result = await image.toBuffer()
      const metadata = await sharp(result).metadata()

      expect(result).toMatchFile(undefined, { fileExtension: '.jpg' })
      expect(metadata).not.toHaveProperty('orientation')
    })

    test('autoOrient (no opt-out) with resize', async () => {
      const metadataBefore = await img.metadata()
      expect(metadataBefore).toHaveProperty('orientation', 5)

      const { image } = await applyTransforms([autoOrient({}, dirCtx)!, resize({ w: '150' }, dirCtx)!], img)

      const result = await image.toBuffer()
      const metadata = await sharp(result).metadata()

      expect(result).toMatchFile(undefined, { fileExtension: '.jpg' })
      expect(metadata).not.toHaveProperty('orientation')
    })
  })
})
