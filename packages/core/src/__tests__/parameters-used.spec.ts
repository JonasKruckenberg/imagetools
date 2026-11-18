import { builtins } from '../builtins'
import { applyTransforms } from '../lib/apply-transforms'
import { generateTransforms } from '../lib/generate-transforms'
import type { ImageConfig } from '../types'
import sharp from 'sharp'
import { join } from 'path'
import { describe, expect, test } from 'vitest'

const fixture = join(__dirname, './__fixtures__/pexels-allec-gomes-5195763.png')
const silentLogger = { info() {}, warn() {}, error() {} }

/**
 * Generates and applies the builtins for a config, recording every directive
 * of the config that the factories or their transforms read. Reporting one
 * doesn't count as reading it, since `useParams` only lists the config's keys,
 * so a factory that reports a directive its transform no longer reads fails.
 */
async function run(config: ImageConfig) {
  const read = new Set<string>()
  const recorder = new Proxy(config, {
    get(target, key, receiver) {
      if (typeof key === 'string' && Object.hasOwn(target, key)) read.add(key)
      return Reflect.get(target, key, receiver)
    },
    has(target, key) {
      if (typeof key === 'string' && Object.hasOwn(target, key)) read.add(key)
      return Reflect.has(target, key)
    }
  })

  const { transforms, parametersUsed } = generateTransforms(
    recorder,
    builtins,
    new URLSearchParams(config),
    silentLogger
  )
  // Transforms read some directives only when applied, e.g. resize reads `fit`.
  await applyTransforms(transforms, sharp(fixture))

  return { read, parametersUsed }
}

/** Configs whose every directive takes effect, keyed by the builtin that acts on them. */
const effectiveConfigs: Record<string, ImageConfig[]> = {
  autoOrient: [{ noAutoOrient: '' }, { noAutoOrient: 'true' }, { noAutoOrient: 'false' }],
  blur: [{ blur: '2' }, { blur: '' }],
  flatten: [{ flatten: '', background: '#ffffff' }],
  flip: [{ flip: '' }],
  flop: [{ flop: 'true' }],
  format: [{ format: 'webp', quality: '80', effort: 'max', lossless: '', progressive: '' }],
  grayscale: [{ grayscale: '' }],
  hsb: [{ hue: '30', saturation: '1.5', brightness: '1.2' }],
  invert: [{ invert: '' }],
  median: [{ median: '3' }],
  normalize: [{ normalize: '' }],
  resize: [
    {
      w: '100',
      h: '50',
      fit: 'contain',
      position: 'left',
      kernel: 'nearest',
      background: '#ffffff',
      allowUpscale: ''
    },
    { w: '100', h: '50', cover: '', top: '' },
    { aspect: '16:9' }
  ],
  rotate: [{ rotate: '45', background: '#ff0000' }],
  tint: [{ tint: 'ff0000' }]
}

const sorted = (keys: Iterable<string>) => [...keys].sort()

describe('parametersUsed', () => {
  test('covers every builtin', () => {
    expect(sorted(Object.keys(effectiveConfigs))).toEqual(sorted(builtins.map((factory) => factory.name)))
  })

  describe.each(Object.entries(effectiveConfigs))('%s', (_, configs) => {
    test.each(configs)('reports exactly the directives read from %o', async (config) => {
      const { read, parametersUsed } = await run(config)

      expect(sorted(parametersUsed)).toEqual(sorted(Object.keys(config)))
      expect(sorted(parametersUsed)).toEqual(sorted(read))
    })
  })

  test.each([
    { why: 'an unknown name', config: { w: '100', widht: '300' }, used: ['w'] },
    { why: 'a removed directive', config: { w: '100', withoutEnlargement: '' }, used: ['w'] },
    {
      why: 'options of a transform that is not generated',
      config: { fit: 'cover', position: 'top', kernel: 'nearest', quality: '80', effort: '4' },
      used: []
    },
    { why: 'values that turn the transform off', config: { blur: '0', flip: 'false', median: '0' }, used: [] }
  ])('leaves out $why', async ({ config, used }) => {
    const { parametersUsed } = await run(config)

    expect(sorted(parametersUsed)).toEqual(used)
  })

  test.each([
    { config: { w: '100', fit: 'bogus' }, used: ['fit', 'w'] },
    { config: { w: '100', h: '50', cover: 'true' }, used: ['cover', 'h', 'w'] }
  ])('does not validate values: $config', async ({ config, used }) => {
    const { parametersUsed } = await run(config)

    expect(sorted(parametersUsed)).toEqual(used)
  })

  test('does not report basePixels, which output formats read', async () => {
    const { parametersUsed } = await run({ w: '100', basePixels: '50' })

    expect(sorted(parametersUsed)).toEqual(['w'])
  })
})
