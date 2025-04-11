import { autoOrient } from '../autoOrient'
import { resize } from '../resize'
import { applyTransforms } from '../../index'
import { consoleLogger } from '../../lib/logger'
import { TransformFactoryContext } from '../../types'
import { join } from 'node:path'
import { toMatchFile } from 'jest-file-snapshot'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import sharp, { FormatEnum, Sharp } from 'sharp'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'

expect.extend({ toMatchFile, toMatchImageSnapshot })

describe('autoOrient', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "autoOrient"', () => {
    const res = autoOrient({ autoOrient: 'true' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = autoOrient({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const throwingFn = () => autoOrient({ autoOrient: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow()
    })

    test('empty', () => {
      const res = autoOrient({ autoOrient: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = autoOrient({ autoOrient: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('false', () => {
      const res = autoOrient({ autoOrient: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/Landscape_5.jpg'))
    })
    ;(
      [
        ['empty', ''],
        ['true', 'true']
      ] as const
    ).forEach(([paramName, paramValue]) => {
      test(paramName, async () => {
        const metadataBefore = await img.metadata()
        expect(metadataBefore).toHaveProperty('orientation', 5)

        const { image } = await applyTransforms([autoOrient({ autoOrient: paramValue }, dirCtx)!], img)

        const result = await image.toBuffer()
        const metadata = await sharp(result).metadata()

        expect(result).toMatchFile(undefined, { fileExtension: '.jpg' })
        expect(metadata).not.toHaveProperty('orientation')
      })

      test(`${paramName} with resize`, async () => {
        const metadataBefore = await img.metadata()
        expect(metadataBefore).toHaveProperty('orientation', 5)

        const { image } = await applyTransforms(
          [autoOrient({ autoOrient: paramValue }, dirCtx)!, resize({ w: '150' }, dirCtx)!],
          img
        )

        const result = await image.toBuffer()
        const metadata = await sharp(result).metadata()

        expect(result).toMatchFile(undefined, { fileExtension: '.jpg' })
        expect(metadata).not.toHaveProperty('orientation')
      })
    })
  })
})
