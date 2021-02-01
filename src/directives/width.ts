import { Directive } from "./index"

export const widthDirective: Directive = {
    name: 'width',
    without: ['size'],

    test(key: string, value: string) {
        if (key !== 'width') return false

        if (!isNaN(parseInt(value))) {
            return true
        } else {
            throw new Error(`invalid width "${value}"`)
        }
    },
    transform(_: string, value: string) {
        return { width: parseInt(value) }
    }
}