import { getProgressive } from '../progressive'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('progressive', () => {
  test('keyword "progressive"', () => {
    const res = getProgressive({ progressive: 'true' }, state)

    expect(res).toEqual(true)
  })

  test('missing', () => {
    const res = getProgressive({}, state)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid progressive values are validated at runtime
      const throwingFn = () => getProgressive({ progressive: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid progressive value: "invalid", expected "true", "false" or a bare "progressive" directive'
      )
    })

    test('false', () => {
      const res = getProgressive({ progressive: 'false' }, state)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getProgressive({ progressive: '' }, state)

      expect(res).toEqual(true)
    })

    test('true', () => {
      const res = getProgressive({ progressive: 'true' }, state)

      expect(res).toEqual(true)
    })
  })
})
