import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://bayexie.github.io/Works/
// With trailingSlash "always", base keeps the trailing slash.
export default defineConfig({
  site: 'https://bayexie.github.io',
  base: '/Works/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
