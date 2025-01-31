import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), sentryVitePlugin({
    org: "caseytrombley",
    project: "javascript-vue"
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/base.scss"; @use "@/styles/animations.scss"; @use "@/styles/mixins.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)), // Ensure proper entry file
      },
    },

    sourcemap: true
  },
  publicDir: 'public', // Vite will copy everything in 'public' to the 'dist' folder
});