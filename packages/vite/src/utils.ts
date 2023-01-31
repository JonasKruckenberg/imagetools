export const createBasePath = (base?: string) => {
    return (base?.replace(/\/$/, '') || '') + '/@imagetools/';
}
