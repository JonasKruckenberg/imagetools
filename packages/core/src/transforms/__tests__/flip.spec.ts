/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TransformFactoryContext } from '../../types'
import { flip } from '../flip'
import { applyTransforms, format } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('flip', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "flip"', () => {
    const res = flip({ flip: 'true' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = flip({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = flip({ flip: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = flip({ flip: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = flip({ flip: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('empty', async () => {
      const { image } = await applyTransforms([flip({ flip: '' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      const { image } = await applyTransforms([flip({ flip: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })

  const exifOrientations = [1, 2, 3, 4, 5, 6]

  exifOrientations.forEach((exifOrientation) => {
    describe(`with orientation ${exifOrientation}:`, () => {
      let img: Sharp
      beforeEach(() => {
        img = sharp(join(__dirname, `../../__tests__/__fixtures__/exif-orientation-${exifOrientation}.jpg`))
      })
      // `.toMatchImageSnapshot` doesn't work with anything other than PNG
      const formatTransform = format({ format: 'png' }, dirCtx)

      const scenarios = [
        {
          name: 'matches removeMetadata=true legacy behavior',
          opts: { removeMetadata: true }
        },
        {
          name: 'matches removeMetadata=false legacy behavior',
          opts: { removeMetadata: false }
        }
      ]

      for (const scenario of scenarios) {
        describe(scenario.name, () => {
          test('once', async () => {
            const { image } = await applyTransforms(
              [flip({ flip: 'true' }, dirCtx)!, formatTransform!],
              img,
              scenario.opts
            )

            expect(await image.toBuffer()).toMatchImageSnapshot()
          })

          test('twice', async () => {
            const { image } = await applyTransforms(
              [flip({ flip: 'true' }, dirCtx)!, flip({ flip: 'true' }, dirCtx)!, formatTransform!],
              img,
              scenario.opts
            )

            expect(await image.toBuffer()).toMatchImageSnapshot()
          })
        })
      }
    })
  })
})
