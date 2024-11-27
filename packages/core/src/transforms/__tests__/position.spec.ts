import { getPosition, PositionValue } from '../position'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { describe, beforeEach, expect, test } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('position', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword "position"', () => {
    const res = getPosition({ position: 'top' }, img)

    expect(res).toEqual('top')
  })

  test('missing', () => {
    const res = getPosition({}, img)

    expect(res).toBeUndefined()
  })

  describe('shorthands', () => {
    test('invalid', () => {})

    test('valid', () => {
      const shorts = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top']

      for (const s of shorts) {
        const res = getPosition({ [s]: '' }, img)

        expect(res).toEqual(s)
      }
    })
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = getPosition({ position: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      //@ts-expect-error invalid args
      const res = getPosition({ position: '' }, img)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const args: PositionValue[] = [
        'top',
        'right top',
        'right',
        'right bottom',
        'bottom',
        'left bottom',
        'left',
        'left top',
        'north',
        'northeast',
        'east',
        'southeast',
        'south',
        'southwest',
        'west',
        'northwest',
        'center',
        'centre',
        'entropy',
        'attention'
      ]

      for (const arg of args) {
        const res = getPosition({ position: arg }, img)

        expect(res).toEqual(arg)
      }
    })
  })
})
