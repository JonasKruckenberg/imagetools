import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from '../dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      cache: false
    })
  ]
})
