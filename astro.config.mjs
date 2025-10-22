import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  server: { port: 4321 },
  vite: {
    server: { fs: { strict: false } },
  },
  site: 'https://matjmiles.github.io',
  base: '/flashcards-astro-starter',
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/matjmiles\.github\.io\/flashcards-astro-starter\/decks\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'decks-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/matjmiles\.github\.io\/flashcards-astro-starter\/images\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'A&P Flashcards',
        short_name: 'Flashcards',
        description: 'Offline-first flashcards for anatomy & physiology',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/flashcards-astro-starter/',
        icons: [
          {
            src: '/flashcards-astro-starter/icons/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/flashcards-astro-starter/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/flashcards-astro-starter/icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
});
