import { Directive } from "./index"

export const heightDirective: Directive = {
    name: 'height',
    without: ['size'],

    test(key: string, value: string) {
        if (key !== 'height') return false

        if (!isNaN(parseInt(value))) {
            return true
        } else {
            throw new Error(`invalid height "${value}"`)
        }
    },
    transform(key: string, value: string) {
        return { height: parseInt(value) }
    }
}