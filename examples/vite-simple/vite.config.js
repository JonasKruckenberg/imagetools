import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [imagetools()]
})
