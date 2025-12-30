import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'), // Si usas alias como en Webpack
  //   },
  // },
  css: {
    devSourcemap: true, // <-- enable CSS/SCSS source maps
  },
  server: {
    port: 8080, // Cambia según tu preferencia
  },
});
