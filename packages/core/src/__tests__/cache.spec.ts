import { has, get, info, remove, generateKey } from '../cache'
import mock from 'mock-fs'

describe('cache', () => {
    afterAll(() => {
        mock.restore()
    })

    describe('has', () => {
        it('returns true if file is present', async () => {
            mock({
                '/cache': {
                    'test.png': 'foobar'
                }
            })

            expect(await has('/cache', 'test.png')).toBeTruthy()
        })

        it('returns false if the file is missing', async () => {
            mock({})

            expect(await has('/cache', 'test.png')).toBeFalsy()
        })
    })

    describe('get', () => {
        it('returns the data', async () => {
            mock({
                '/cache': {
                    'test.png': Buffer.from('foobar')
                }
            })

            const res = await get('/cache', 'test.png')
            expect(res).toHaveProperty('data', Buffer.from('foobar'))
        })

        it('returns the metadata if metadata file is present', async () => {
            mock({
                '/cache': {
                    'test.png': Buffer.from('foobar'),
                    'test.png.json': JSON.stringify({ foo: 'bar' })
                }
            })

            const res = await get('/cache', 'test.png')

            expect(res).toHaveProperty('data', Buffer.from('foobar'))
            expect(res).toHaveProperty('metadata', { foo: 'bar' })
        })

        it('returns an empty object if metadata file is missing', async () => {
            mock({
                '/cache': {
                    'test.png': Buffer.from('foobar')
                }
            })

            const res = await get('/cache', 'test.png')

            expect(res).toHaveProperty('data', Buffer.from('foobar'))
            expect(res).toHaveProperty('metadata', {})
        })

        it('throws if no image is found', async (done) => {
            mock({})

            try {
                await get('/cache', 'test.png')
                fail()
            } catch {
                done()
            }
        })
    })

    describe('info', () => {
        it('returns an object if metadata file is present', async () => {
            mock({
                '/cache': {
                    'test.png.json': JSON.stringify({ foo: 'bar' })
                }
            })

            const res = await info('/cache', 'test.png')

            expect(res).toHaveProperty('foo', 'bar')
        })

        it('throws if not metadata file is found', async (done) => {
            mock({})

            try {
                await info('/cache', 'test.png')
                fail()
            } catch {
                done()
            }
        })
    })

    describe('remove', () => {
        it('removes the image file', () => { })
        it('removes the metadata file if present', () => { })
        it('throws if no image is found', () => { })
    })

    describe('generateKey', () => {
        it('returns a string', () => { })
        test('returned string has file ending', () => { })
        test('returned file ending matches config', () => { })
    })
})