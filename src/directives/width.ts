import { Directive } from "./index"

export const widthDirective: Directive = {
    name: 'width',
    test(key: string, value: string) {
        return key === 'width' && !isNaN(parseInt(value))
    },
    transform(_: string, value: string) {
        return { width: parseInt(value) }
    }
}