/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TransformFactoryContext } from '../../types'
import { flop } from '../flop'
import { applyTransforms, format } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('flop', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "flop"', () => {
    const res = flop({ flop: 'true' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = flop({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = flop({ flop: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = flop({ flop: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = flop({ flop: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('empty', async () => {
      const { image } = await applyTransforms([flop({ flop: '' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      const { image } = await applyTransforms([flop({ flop: 'true' }, dirCtx)!], img)

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
          opts: { removeMetadata: true, experimental: { preserveInitialOrientation: false } }
        },
        {
          name: 'matches removeMetadata=false legacy behavior',
          opts: { removeMetadata: false, experimental: { preserveInitialOrientation: false } }
        },
        {
          name: 'matches removeMetadata=true expected behavior',
          opts: { removeMetadata: true, experimental: { preserveInitialOrientation: true } }
        },
        {
          name: 'matches removeMetadata=false expected behavior',
          opts: { removeMetadata: false, experimental: { preserveInitialOrientation: true } }
        }
      ]

      for (const scenario of scenarios) {
        describe(scenario.name, () => {
          test('once', async () => {
            const { image } = await applyTransforms(
              [flop({ flop: 'true' }, dirCtx)!, formatTransform!],
              img,
              scenario.opts
            )

            expect(await image.toBuffer()).toMatchImageSnapshot()
          })

          test('twice', async () => {
            const { image } = await applyTransforms(
              [flop({ flop: 'true' }, dirCtx)!, flop({ flop: 'true' }, dirCtx)!, formatTransform!],
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
