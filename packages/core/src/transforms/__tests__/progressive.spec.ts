import { getProgressive } from '../progressive'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOrient: { width: 0, height: 0 } },
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
      //@ts-expect-error invalid args
      const res = getProgressive({ progressive: 'invalid' }, state)

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
