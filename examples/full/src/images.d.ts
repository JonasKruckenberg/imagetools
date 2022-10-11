declare module "*?w=500;900;1200&avif;webp;jpg&picture" {
  const image: {
    sources: Record<string, { src: string, w: string }[]>,
    fallback: { src: string, w: string }
  };
  export default image;
}

declare module "*?width=300&webp&metadata" {
  export const src: string;
  export const width: string;
  export const height: string;
}

declare module "*?w=500;900;1200&avif&source" {
  const image: { src: string, w: string }[]

  export default image
}

declare module "*?w=500;900;1200&webp&source" {
  const image: { src: string, w: string }[]

  export default image
}

declare module "*?w=700" {
  const image: string

  export default image
}  

declare module "*?w=500;900;1200&avif&srcset" {
  const image: string

  export default image
}

declare module "*?w=500;900;1200&webp&srcset" {
  const image: string

  export default image
}