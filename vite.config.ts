import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

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
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
    sourcemap: true
  },
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'https://www.blog.caseytrombley.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
