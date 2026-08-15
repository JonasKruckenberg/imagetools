import { flatten } from '../flatten'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('flatten', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "flatten"', () => {
    const res = flatten({ flatten: 'true' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = flatten({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid flatten values are validated at runtime
      const throwingFn = () => flatten({ flatten: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid flatten value: "invalid", expected "true", "false" or a bare "flatten" directive'
      )
    })

    test('false', () => {
      const res = flatten({ flatten: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = flatten({ flatten: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = flatten({ flatten: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('w/ background', () => {
      const res = flatten({ flatten: 'true', background: 'fff' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('empty', async () => {
      const { image } = await applyTransforms([flatten({ flatten: '' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      const { image } = await applyTransforms([flatten({ flatten: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ background', async () => {
      const { image } = await applyTransforms([flatten({ flatten: 'true', background: '#00f' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
