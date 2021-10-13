import { grayscale } from '../grayscale'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('grayscale', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: jest.fn, warn: jest.fn }
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
      //@ts-expect-error
      const res = grayscale({ grayscale: 'invalid' }, dirCtx)

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
      //@ts-ignore
      const { image, metadata } = await applyTransforms([grayscale({ grayscale: '' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('true', async () => {
      //@ts-ignore
      const { image, metadata } = await applyTransforms([grayscale({ grayscale: 'true' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
