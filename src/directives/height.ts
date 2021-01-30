import { Directive } from "./index"

export const heightDirective: Directive = {
    name: 'height',
    test(key: string, value: string) {
        return key == 'height' && !isNaN(parseInt(value))
    },
    transform(key: string, value: string) {
        return { height: parseInt(value) }
    }
}