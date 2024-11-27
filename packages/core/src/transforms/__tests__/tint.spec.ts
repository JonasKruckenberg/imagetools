import { tint } from '../tint'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, expect, test, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('tint', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "tint"', () => {
    const res = tint({ tint: 'fff' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = tint({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('empty', () => {
      const res = tint({ tint: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('hex color', () => {
      const res = tint({ tint: 'fff' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('red', async () => {
      const { image } = await applyTransforms([tint({ tint: 'f00' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('green', async () => {
      const { image } = await applyTransforms([tint({ tint: '0f0' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('blue', async () => {
      const { image } = await applyTransforms([tint({ tint: '00f' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
