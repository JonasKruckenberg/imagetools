import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { getBackground } from '../background'
import { describe, beforeEach, test, expect } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('background', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword: "background"', () => {
    const res = getBackground({ background: '#fff' }, img)

    expect(res).toEqual('#fff')
  })

  test('null if missing', () => {
    const res = getBackground({}, img)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('empty', () => {
      const res = getBackground({ background: '' }, img)

      expect(res).toBeUndefined()
    })

    test('hex color', () => {
      const res = getBackground({ background: '#fff' }, img)

      expect(res).toEqual('#fff')
    })

    test('rgb', () => {
      const res = getBackground({ background: 'rgb(123, 255, 9)' }, img)

      expect(res).toEqual('rgb(123, 255, 9)')
    })

    test('rgba color', () => {
      const res = getBackground({ background: 'rgba(123, 255, 120, 10)' }, img)

      expect(res).toEqual('rgba(123, 255, 120, 10)')
    })

    test('hsl color', () => {
      const res = getBackground({ background: 'hsl(41, 50%, 45%)' }, img)

      expect(res).toEqual('hsl(41, 50%, 45%)')
    })

    test('hsla', () => {
      const res = getBackground({ background: 'hsla(400, 10%, 200%, 10)' }, img)

      expect(res).toEqual('hsla(400, 10%, 200%, 10)')
    })

    test('named css color', () => {
      const res = getBackground({ background: 'red' }, img)

      expect(res).toEqual('red')
    })
  })
})
