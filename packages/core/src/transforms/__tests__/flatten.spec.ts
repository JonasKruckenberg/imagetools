import { flatten } from '../flatten'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('flatten', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: jest.fn, warn: jest.fn }
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
      //@ts-expect-error
      const res = flatten({ flatten: 'invalid' }, dirCtx)

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
      //@ts-ignore
      const { image, metadata } = await applyTransforms([flatten({ flatten: '' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      //@ts-ignore
      const { image, metadata } = await applyTransforms([flatten({ flatten: 'true' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ background', async () => {
      //@ts-ignore
      const { image, metadata } = await applyTransforms([flatten({ flatten: 'true', background: '#00f' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
