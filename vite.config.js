import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: './index.js', // Ponto de entrada para o arquivo index.js
        main: './main.js'    // Ponto de entrada para o arquivo main.js
      }
    }
  }
});