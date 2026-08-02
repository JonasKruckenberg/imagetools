import { applyTransforms } from '../lib/apply-transforms'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('applyTransforms', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, './__fixtures__/with-metadata.png'))
  })

  it('applies the transforms to the image', async () => {
    const t = vi.fn((_state, image) => image)

    await applyTransforms([t], img)

    expect(t).toBeCalled()
  })

  it('initializes the metadata state from the image', async () => {
    const t = vi.fn((_state, image) => image)

    const { metadata } = await applyTransforms([t], img)

    expect(metadata.info.width).toBeTypeOf('number')
    expect(metadata.info.height).toBeTypeOf('number')
    expect(metadata.info.autoOriented).toBeDefined()
    expect(metadata.transforms.format).toBeTypeOf('string')
  })

  it('strips metadata by default', async () => {
    const t = vi.fn((_state, image) => image)

    const { image, raw } = await applyTransforms([t], img, true)

    const metadata = await sharp(await image.toBuffer()).metadata()

    expect(t).toBeCalled()
    expect(metadata).not.toHaveProperty('xmp')
    expect(metadata).not.toHaveProperty('exif')
    expect(metadata).not.toHaveProperty('iptc')
    expect(raw).not.toHaveProperty('xmp')
    expect(raw).not.toHaveProperty('exif')
    expect(raw).not.toHaveProperty('iptc')
    expect(raw).not.toHaveProperty('icc')
    expect(raw).not.toHaveProperty('tifftagPhotoshop')
  })

  it('metadata stripping can be disabled', async () => {
    const t = vi.fn((_state, image) => image)

    const { image, raw } = await applyTransforms([t], img, false)

    const metadata = await sharp(await image.toBuffer()).metadata()

    expect(t).toBeCalled()
    expect(metadata).toHaveProperty('xmp')
    expect(raw).toHaveProperty('xmp')
  })

  it('returns the image data & info', async () => {
    const t = vi.fn((_state, image) => image)

    const res = await applyTransforms([t], img)

    expect(t).toBeCalled()
    expect(res).toHaveProperty('image')
    expect(res).toHaveProperty('metadata')
  })
})
