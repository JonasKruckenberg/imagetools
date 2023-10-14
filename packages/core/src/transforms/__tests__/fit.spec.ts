import { getFit, FitValue } from '../fit'
import { join } from 'path'
import sharp, { Sharp } from 'sharp'
import { describe, beforeEach, test, expect } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('fit', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword "fit"', () => {
    const res = getFit({ fit: 'cover' }, img)

    expect(res).toEqual('cover')
  })

  test('missing', () => {
    const res = getFit({}, img)

    expect(res).toBeUndefined()
  })

  describe('shorthands', () => {
    test('invalid', () => {
      const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const short of shorts) {
        const res = getFit({ [short]: 'invalid' }, img)

        expect(res).toBeUndefined()
      }
    })

    test('valid', () => {
      const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const short of shorts) {
        const res = getFit({ [short]: '' }, img)

        expect(res).toEqual(short)
      }
    })
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = getFit({ fit: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getFit({ getFit: '' }, img)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const args: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const arg of args) {
        const res = getFit({ fit: arg }, img)

        expect(res).toEqual(arg)
      }
    })
  })
})
