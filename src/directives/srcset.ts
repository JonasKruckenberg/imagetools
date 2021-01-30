import { Directive } from "."

export const srcsetDirective: Directive = {
    name: 'size',
    test(key: string, value: string) {
        return key === 'size' && value === ''
    },
    transform() {
        return { srcset: true }
    }
}