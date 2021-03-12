import { MetaDirective } from "../types";

export interface ProgressiveOptions {
    progressive: '' | 'true'
}

export const progressive:MetaDirective<ProgressiveOptions> = ({ progressive },ctx) => {
    if(progressive !== '' && progressive !== 'true') return

    return true
}