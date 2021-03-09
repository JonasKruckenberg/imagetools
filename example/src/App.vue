<template>
  <picture>
    <source srcset="./assets/logo.png?width=300;400;500&avif&srcset" type="image/avif" />
    <source srcset="./assets/logo.png?width=300;400;500&webp&srcset" type="image/webp" />
    <img alt="Vue logo" src="./assets/logo.png?webp" />
  </picture>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>