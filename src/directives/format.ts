import { Directive } from "./index"
import pm from 'picomatch'


export const formatDirective: Directive = {
    name: 'format',

    test(key: string, value: string) {
        const isKeyword = pm(['jpeg', 'jpg', 'webp', 'avif', 'png', 'gif', 'tiff', 'heif'])

        return (key === 'format' && isKeyword(value))
            || (isKeyword(key) && value === '')
    },
    transform(key: string, value: string) {
        return { format: !!value ? value : key }
    }
}