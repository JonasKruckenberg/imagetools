import { GetParam } from "../types";

export const getBackground: GetParam<'background', string> = ({ background }) => {
    if (typeof background !== 'string' || !background.length) return

    return background
}