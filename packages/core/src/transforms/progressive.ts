import { GetParam } from "../types";

export const getProgressive: GetParam<'progressive', boolean> = ({ progressive }) => {
    if (progressive !== '' && progressive !== 'true') return

    return true
}