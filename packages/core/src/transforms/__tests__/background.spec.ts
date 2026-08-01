import { getBackground } from '../background'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOrient: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('background', () => {
  test('keyword: "background"', () => {
    const res = getBackground({ background: '#fff' }, state)

    expect(res).toEqual('#fff')
  })

  test('null if missing', () => {
    const res = getBackground({}, state)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('empty', () => {
      const res = getBackground({ background: '' }, state)

      expect(res).toBeUndefined()
    })

    test('hex color', () => {
      const res = getBackground({ background: '#fff' }, state)

      expect(res).toEqual('#fff')
    })

    test('rgb', () => {
      const res = getBackground({ background: 'rgb(123, 255, 9)' }, state)

      expect(res).toEqual('rgb(123, 255, 9)')
    })

    test('rgba color', () => {
      const res = getBackground({ background: 'rgba(123, 255, 120, 10)' }, state)

      expect(res).toEqual('rgba(123, 255, 120, 10)')
    })

    test('hsl color', () => {
      const res = getBackground({ background: 'hsl(41, 50%, 45%)' }, state)

      expect(res).toEqual('hsl(41, 50%, 45%)')
    })

    test('hsla', () => {
      const res = getBackground({ background: 'hsla(400, 10%, 200%, 10)' }, state)

      expect(res).toEqual('hsla(400, 10%, 200%, 10)')
    })

    test('named css color', () => {
      const res = getBackground({ background: 'red' }, state)

      expect(res).toEqual('red')
    })
  })
})
