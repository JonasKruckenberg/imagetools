import { Directive } from "./index"
import pm from 'picomatch'


export const formatDirective: Directive = {
    name: 'format',
    test(key: string, value: string) {
        if (key === 'format') return true

        return pm.isMatch(key, ['jpeg', 'webp', 'avif', 'png', 'gif', 'tiff', 'heif']) && value === ''
    },
    transform(key: string, value: string) {
        return { format: !!value ? value : key }
    }
}