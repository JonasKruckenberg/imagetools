import { getQuality } from '../quality'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'

describe('quality', () => {
    let img: Sharp
    beforeEach(() => {
        img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
    })

    test('keyword "quality"', () => {
        const res = getQuality({ quality: '3' }, img)

        expect(res).toEqual(3)
    })

    test('missing', () => {
        const res = getQuality({}, img)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = getQuality({ quality: 'invalid' }, img)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = getQuality({ quality: '' }, img)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = getQuality({ quality: '3' }, img)

            expect(res).toEqual(3)
        })

        it('rounds float to int', () => {
            const res = getQuality({ quality: '3.5' }, img)

            expect(res).toEqual(3)
        })
    })
})