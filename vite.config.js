import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Defina a raiz do projeto como a pasta 'src'
  base: '/ChefDefensor/', // Substitua pelo nome correto do seu repositório
  build: {
    outDir: '../dist', // Saída da build para a pasta 'dist'
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'three-gltf-loader': ['three/examples/jsm/loaders/GLTFLoader.js']
        }
      }
    }
  }
});