import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ChefDefensor/',  // Substitua 'nome-do-repositorio' pelo nome do seu repositório no GitHub
  build: {
    outDir: 'dist',
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