import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { getBackground } from '../background'

describe('background', () => {
    let img: Sharp
    beforeEach(() => {
        img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
    })

    test('keyword: "background"', () => {
        const res = getBackground({ background: 'fff' }, img)

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
            const res = getBackground({ background: 'fff' }, img)

            expect(res).toEqual('#fff')
        })
    })
})