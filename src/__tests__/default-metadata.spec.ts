import { join } from 'path'
import sharp from 'sharp'
import { imageToBuffer } from '../util'

describe('default metadata', () => {
    describe('width', () => {
        it('is present', async () => {
            const img = sharp(join(__dirname, './__assets__/pexels-allec-gomes-5195763.jpg'))

            const { metadata } = await imageToBuffer(img)

            expect(metadata).toHaveProperty('width', 640)
        })
    })
    describe('height', () => {
        it('is present', async () => {
            const img = sharp(join(__dirname, './__assets__/pexels-allec-gomes-5195763.jpg'))

            const { metadata } = await imageToBuffer(img)

            expect(metadata).toHaveProperty('height', 800)
        })
    })
    describe('channels', () => {
        it('is present', async () => {
            const img = sharp(join(__dirname, './__assets__/pexels-allec-gomes-5195763.jpg'))

            const { metadata } = await imageToBuffer(img)

            expect(metadata).toHaveProperty('channels', 3)
        })
    })
    describe('format', () => {
        it('is present', async () => {
            const img = sharp(join(__dirname, './__assets__/pexels-allec-gomes-5195763.jpg'))

            const { metadata } = await imageToBuffer(img)

            expect(metadata).toHaveProperty('format', 'jpeg')
        })
    })
    describe('size', () => {
        it('is present', async () => {
            const img = sharp(join(__dirname, './__assets__/pexels-allec-gomes-5195763.jpg'))

            const { metadata } = await imageToBuffer(img)

            expect(metadata).toHaveProperty('size', 27922)
        })
    })
})