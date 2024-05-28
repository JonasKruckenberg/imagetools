/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { rotate } from '../rotate'
import { TransformFactoryContext } from '../../types'
import { applyTransforms, format } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test, it } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('rotate', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "rotate"', () => {
    const res = rotate({ rotate: '90' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = rotate({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = rotate({ rotate: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = rotate({ rotate: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = rotate({ rotate: '90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    it('rounds float to int', () => {
      const res = rotate({ rotate: '90.75' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('90', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('180', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '180' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ background', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '45', background: '#0f0' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
  ;[1, 2, 3, 4, 5, 6].forEach((exifOrientation) => {
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
          test('90', async () => {
            const { image } = await applyTransforms(
              [rotate({ rotate: '90' }, dirCtx)!, formatTransform!],
              img,
              scenario.opts
            )

            expect(await image.toBuffer()).toMatchImageSnapshot()
          })

          test('180', async () => {
            const { image } = await applyTransforms(
              [rotate({ rotate: '180' }, dirCtx)!, formatTransform!],
              img,
              scenario.opts
            )

            expect(await image.toBuffer()).toMatchImageSnapshot()
          })

          test('45', async () => {
            const { image } = await applyTransforms(
              [rotate({ rotate: '45' }, dirCtx)!, formatTransform!],
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
