<template>
  <img alt="Vue logo" :src="Logo.src" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Logo from './assets/logo.png?meta&foo=bar'

console.log(Logo);

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    return { Logo }
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