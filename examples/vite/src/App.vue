<template>
  <img alt="Vue logo" v-for="image of Images" :src="image.src" :width="image.width" :height="image.height"/>
</template>

<script lang="ts" setup>
import Images from './assets/logo.png?w=100;200;400&meta'

console.log(Images);
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