import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    /* `@` is the only alias: it points at `src/`, so a module's import
       path reads the same from anywhere and never counts `../` hops. */
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
