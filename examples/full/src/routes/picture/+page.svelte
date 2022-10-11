<script lang="ts">
  import image from '$lib/assets/example.jpg?w=500;900;1200&avif;webp;jpg&picture'
</script>

<picture>
  {#each Object.entries(image.sources) as [format, images]}
    <source srcset={images.map((i) => `${i.src}`).join(', ')} type={'image/' + format} />
  {/each}
  <img src={image.fallback.src} alt=""/>
</picture>`
