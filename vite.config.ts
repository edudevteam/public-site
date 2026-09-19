import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {galleryPlugin} from './galleryPlugin';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), galleryPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
