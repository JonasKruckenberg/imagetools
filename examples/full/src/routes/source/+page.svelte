<script lang="ts">
import avif from '$lib/assets/example.jpg?w=500;900;1200&avif&srcset'
import webp from '$lib/assets/example.jpg?w=500;900;1200&webp&srcset'
import fallback from '$lib/assets/example.jpg?w=700'
</script>

<picture>
    <source srcset="${avif}" type="image/avif" />
    <source srcset="${webp}" type="image/webp" />
    <img src="${fallback}" alt="" />
</picture>
