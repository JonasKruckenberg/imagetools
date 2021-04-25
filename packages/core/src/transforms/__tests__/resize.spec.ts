import { resize } from '../resize'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('width', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "width"', () => {
        const res = resize({ width: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keyword "w"', () => {
        const res = resize({ w: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = resize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = resize({ width: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = resize({ width: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = resize({ width: '300' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('rounds float to int', () => {
            const res = resize({ height: '300.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('100', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ width: '100' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('400', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ width: '400' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})

describe('height', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "height"', () => {
        const res = resize({ height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keyword "h"', () => {
        const res = resize({ h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = resize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = resize({ height: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = resize({ height: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = resize({ height: '300' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('rounds float to int', () => {
            const res = resize({ height: '300.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('100', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ height: '100' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('400', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ height: '400' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})

describe('width & height', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keywords "width" & "height"', () => {
        const res = resize({ width: '300', height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "w" & "h"', () => {
        const res = resize({ w: '300', h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "width" & "h"', () => {
        const res = resize({ width: '300', h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "w" & "height"', () => {
        const res = resize({ w: '300', height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('basic', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ w: '300', h: '300' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ w: '300', h: '300', fit: 'contain' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit & background', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ w: '300', h: '300', fit: 'contain', background: '0f0' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit and position', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ w: '300', h: '300', fit: 'cover', position: 'top' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ kernel', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ w: '300', h: '300', kernel: 'cubic' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})

describe('aspect', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "aspect"', () => {
        const res = resize({ aspect: '16:9' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = resize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = resize({ aspect: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = resize({ aspect: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('colon delimited aspect ratio', () => {
            const res = resize({ height: '16:9' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('basic', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', fit: 'contain' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit & background', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', fit: 'contain', background: '0f0' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ fit and position', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', fit: 'cover', position: 'top' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ kernel', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', kernel: 'cubic' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ height', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', height: '75' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ width', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', width: '300' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('w/ width & height', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([resize({ aspect: '4:3', height: '300', width: '300' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})