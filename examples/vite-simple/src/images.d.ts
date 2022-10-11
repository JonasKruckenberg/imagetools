declare module "*?w=500;700;900;1200&avif&srcset" {
  const image: string;
  export default image;
}

declare module "*?w=500;700;900;1200&webp&srcset" {
  const image: string;
  export default image;
}

declare module "*?width=300&metadata" {
  export const src: string;
  export const width: string;
  export const height: string;
}
