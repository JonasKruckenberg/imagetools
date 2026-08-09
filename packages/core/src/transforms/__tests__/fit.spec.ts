import { getFit, FitValue } from '../fit'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('fit', () => {
  test('keyword "fit"', () => {
    const res = getFit({ fit: 'cover' }, state)

    expect(res).toEqual('cover')
  })

  test('missing', () => {
    const res = getFit({}, state)

    expect(res).toBeUndefined()
  })

  describe('shorthands', () => {
    test('invalid', () => {
      const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const short of shorts) {
        const res = getFit({ [short]: 'invalid' }, state)

        expect(res).toBeUndefined()
      }
    })

    test('valid', () => {
      const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const short of shorts) {
        const res = getFit({ [short]: '' }, state)

        expect(res).toEqual(short)
      }
    })
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid fit values are validated at runtime
      const throwingFn = () => getFit({ fit: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid fit value: "invalid", expected one of "cover", "contain", "fill", "inside" or "outside", or "false" to disable'
      )
    })

    test('empty', () => {
      const res = getFit({ getFit: '' }, state)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = getFit({ fit: 'false' }, state)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const args: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

      for (const arg of args) {
        const res = getFit({ fit: arg }, state)

        expect(res).toEqual(arg)
      }
    })
  })
})
