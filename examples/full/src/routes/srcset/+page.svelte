<script lang="ts">
  import avif from '$lib/assets/example.jpg?w=500;900;1200&avif&source'
  import webp from '$lib/assets/example.jpg?w=500;900;1200&webp&source'
</script>

<picture>
  <source srcset={avif.map(({ src, w }) => `${src} ${w}w`).join(',')} type="image/avif" />
  <source srcset={webp.map(({ src, w }) => `${src} ${w}w`).join(',')} type="image/webp" />
  <img src="" alt="" />
</picture>
