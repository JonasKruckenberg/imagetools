import { applyTransforms } from '../lib/apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('applyTransforms', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, './__fixtures__/with-metadata.png'))
  })

  it('applies the transforms to the image', async () => {
    const t = vi.fn((i) => i)

    await applyTransforms([t], img)

    expect(t).toBeCalled()
  })

  it('strips metadata by default', async () => {
    const t = vi.fn((i) => i)

    const { metadata } = await applyTransforms([t], img, true)

    expect(t).toBeCalled()
    expect(metadata).not.toHaveProperty('icc')
    expect(metadata).not.toHaveProperty('xmp')
    expect(metadata).not.toHaveProperty('exif')
    expect(metadata).not.toHaveProperty('tifftagPhotoshop')
    expect(metadata).not.toHaveProperty('iptc')
  })

  it('metadata stripping can be disabled', async () => {
    const t = vi.fn((i) => i)

    const { metadata } = await applyTransforms([t], img, false)

    expect(t).toBeCalled()
    expect(metadata).toHaveProperty('icc')
    expect(metadata).toHaveProperty('xmp')
  })

  it('returns the image data & info', async () => {
    const t = vi.fn((i) => i)

    const res = await applyTransforms([t], img)

    expect(t).toBeCalled()
    expect(res).toHaveProperty('image')
    expect(res).toHaveProperty('metadata')
  })
})
