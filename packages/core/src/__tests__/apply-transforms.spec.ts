import { applyTransforms } from '../lib/apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'

describe('applyTransforms', () => {
    let img: Sharp
    beforeEach(() => {
        img = sharp(join(__dirname, './__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    it('applies the transforms to the image', async () => {
        const t = jest.fn(i => i)

        await applyTransforms([t], img)

        expect(t).toBeCalled()
    })

    it('returns the image data & info', async () => {
        const t = jest.fn(i => i)

        const res = await applyTransforms([t], img)

        expect(res).toHaveProperty('image')
        expect(res).toHaveProperty('metadata')
    })
})