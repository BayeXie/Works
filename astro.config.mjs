import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace `site` with the production origin before launch.
// Canonical URLs, Open Graph, and the sitemap all use this value.
export default defineConfig({
  site: 'https://bayexie.github.io',
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
