import { grayscale } from '../grayscale'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('grayscale', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "grayscale"', () => {
    const res = grayscale({ grayscale: 'true' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = grayscale({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid grayscale values are validated at runtime
      const throwingFn = () => grayscale({ grayscale: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid grayscale value: "invalid", expected "true", "false" or a bare "grayscale" directive'
      )
    })

    test('false', () => {
      const res = grayscale({ grayscale: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = grayscale({ grayscale: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = grayscale({ grayscale: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('empty', async () => {
      const { image } = await applyTransforms([grayscale({ grayscale: '' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      const { image } = await applyTransforms([grayscale({ grayscale: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
