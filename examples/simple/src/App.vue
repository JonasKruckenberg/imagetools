<template>
  <div style="max-width:400px;">
    <img alt="Vue logo" :src="Logo1" />
    <img alt="Vue logo" :src="Logo2" />
    <img alt="Vue logo" :src="Logo3" />
  </div>
  <h1>Vite + Imagetools</h1>
  <a href="https://github.com/JonasKruckenberg/vite-imagetools">documentation</a>
</template>

<script setup>
  import Logo1 from './assets/logo.png?rotate=180&background=fff&hue=80'
  import Logo2 from './assets/logo.png?rotate=180&brightness=1.2&grayscale'
  import Logo3 from './assets/logo.png?blur=5'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>