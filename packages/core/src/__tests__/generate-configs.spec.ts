import { resolveConfigs } from '../lib/resolve-configs'
import { builtinOutputFormats } from '../'
import { describe, test, it, expect } from 'vitest'

describe('generateConfigs', () => {
  it('accepts and array of entries', () => {
    const e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    expect(() => resolveConfigs(e, builtinOutputFormats)).not.toThrow()
  })

  it('returns an array of objects', () => {
    const e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    const res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res[0]).toBeInstanceOf(Object)
  })

  it('returns a single object if only single arguments are used', () => {
    const e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    const res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res).toHaveLength(1)
  })

  it('returns a single object if only single arguments are used', () => {
    const e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300', '400']]
    ]

    const res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res).toHaveLength(2)
  })

  test('the returned array length equals the product of all arguments', () => {
    {
      const e: [string, string[]][] = [['width', ['300', '400']]]

      const res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(2)
    }
    {
      const e: [string, string[]][] = [
        ['width', ['300', '400']],
        ['test', ['foo', 'bar']]
      ]

      const res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(4)
    }
    {
      const e: [string, string[]][] = [
        ['width', ['300', '400']],
        ['test', ['foo', 'bar']],
        ['height', ['100', '700']]
      ]

      const res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(8)
    }
  })

  test('returned objects all have string values', () => {
    const e: [string, string[]][] = [
      ['width', ['300', '400']],
      ['height', ['100', '700']]
    ]

    const res = resolveConfigs(e, builtinOutputFormats)

    for (const options of res) {
      for (const key in options) {
        expect(typeof options[key]).toBe('string')
      }
    }
  })

  test('output transforms are ignored', () => {
    const e: [string, string[]][] = [
      ['width', ['300', '400']],
      ['height', ['100', '700']],
      ['metadata', ['width', 'height']]
    ]

    const res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toHaveLength(4)
  })

  test('only output transforms', () => {
    const e: [string, string[]][] = [['metadata', ['width', 'height']]]

    const res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toHaveLength(1)
  })
})
