import { blur } from '../blur'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('blur', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "blur"', () => {
    const res = blur({ blur: '3' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = blur({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => blur({ blur: 'invalid arg' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid blur value: "invalid arg", expected a number between 0.3 and 1000, "true", "false" or a bare "blur" directive'
      )
    })

    test('false', () => {
      const res = blur({ blur: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = blur({ blur: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = blur({ blur: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('integer', () => {
      const res = blur({ blur: '5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      const res = blur({ blur: '3.5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('rejects a negative sigma', () => {
      const throwingFn = () => blur({ blur: '-3' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid blur value: "-3", expected a number between 0.3 and 1000, "true", "false" or a bare "blur" directive'
      )
    })

    test('rejects an out-of-range sigma', () => {
      const throwingFn = () => blur({ blur: '1001' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid blur value: "1001", expected a number between 0.3 and 1000, "true", "false" or a bare "blur" directive'
      )
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('true', async () => {
      const { image } = await applyTransforms([blur({ blur: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('0.5', async () => {
      const { image } = await applyTransforms([blur({ blur: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('5', async () => {
      const { image } = await applyTransforms([blur({ blur: '5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('50', async () => {
      const { image } = await applyTransforms([blur({ blur: '50' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
