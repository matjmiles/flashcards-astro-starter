import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  server: { port: 4321 },
  vite: {
    server: { fs: { strict: false } },
  },
  site: 'https://YOUR_USERNAME.github.io',
  base: '/flashcards-astro-starter',
});
