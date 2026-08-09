import { getPosition, PositionValue } from '../position'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('position', () => {
  test('keyword "position"', () => {
    const res = getPosition({ position: 'top' }, state)

    expect(res).toEqual('top')
  })

  test('missing', () => {
    const res = getPosition({}, state)

    expect(res).toBeUndefined()
  })

  describe('shorthands', () => {
    test('invalid', () => {})

    test('valid', () => {
      const shorts = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top']

      for (const s of shorts) {
        const res = getPosition({ [s]: '' }, state)

        expect(res).toEqual(s)
      }
    })
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid position values are validated at runtime
      const throwingFn = () => getPosition({ position: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid position value: "invalid", expected one of "top", "right top", "right", "right bottom", "bottom", "left bottom", "left", "left top", "north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "center", "centre", "entropy" or "attention", or "false" to disable'
      )
    })

    test('empty', () => {
      const res = getPosition({ position: '' }, state)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = getPosition({ position: 'false' }, state)

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
        const res = getPosition({ position: arg }, state)

        expect(res).toEqual(arg)
      }
    })
  })
})
