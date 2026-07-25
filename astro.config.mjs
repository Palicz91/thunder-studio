// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thundermusicstudio.com',
  output: 'static',
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== 'https://thundermusicstudio.com/',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
