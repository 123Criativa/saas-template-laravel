import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';
import i18n from 'laravel-react-i18n/vite';

const env = loadEnv('', process.cwd());

const host = env.VITE_HOST;

export default defineConfig({
  server: {
    host,
    hmr: {
      host,
      clientPort: 443,
    },
  },
  plugins: [
    viteBasicSslPlugin(),
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
    i18n(),
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
  ssr: {
    noExternal: ['@inertiajs/server'],
  },
});
