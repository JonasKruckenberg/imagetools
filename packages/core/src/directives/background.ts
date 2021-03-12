import { MetaDirective } from "../types";

export interface BackgroundOptions {
    background: string
}

export const background: MetaDirective<BackgroundOptions, string> = ({ background }, ctx) => {
    if (typeof background !== 'string' || !background.length) return

    return '#' + background
}