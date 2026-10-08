import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site de usuário do GitHub Pages (Felpscripter.github.io) é servido na raiz.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
