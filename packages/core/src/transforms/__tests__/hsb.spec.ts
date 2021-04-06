import { hsb } from '../hsb'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('hue', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "hue"', () => {
        const res = hsb({ hue: '90' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = hsb({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = hsb({ hue: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = hsb({ hue: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = hsb({ hue: '90' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('float', () => {
            const res = hsb({ hue: '4.3' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('negative integer', () => {
            const res = hsb({ hue: '-90' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('negative float', () => {
            const res = hsb({ hue: '-4.3' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('45', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ hue: '45' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('90', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ hue: '90' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('-90', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ hue: '-90' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('180', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ hue: '180' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})

describe('saturation', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "saturation"', () => {
        const res = hsb({ saturation: '1' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = hsb({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = hsb({ saturation: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = hsb({ saturation: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = hsb({ saturation: '1' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('float', () => {
            const res = hsb({ saturation: '0.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('0.5', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ saturation: '0.5' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('1', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ saturation: '1' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('1.5', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ saturation: '1.5' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})

describe('brightness', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "brightness"', () => {
        const res = hsb({ brightness: '1' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = hsb({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = hsb({ brightness: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = hsb({ brightness: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = hsb({ brightness: '1' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('float', () => {
            const res = hsb({ brightness: '0.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('0.5', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ brightness: '0.5' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('1', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ brightness: '1' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('1.5', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([hsb({ brightness: '1.5' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})