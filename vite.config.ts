import { defineConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

function foodLookupDevApi() {
  return {
    name: 'food-lookup-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/food-lookup', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost');
        // @ts-expect-error Vercel function is plain JS so it can run without a build step.
        const { default: handler } = await import('./api/food-lookup.js');
        const apiReq = {
          method: req.method,
          query: Object.fromEntries(url.searchParams.entries()),
        };
        const apiRes = {
          setHeader: (name: string, value: string) => res.setHeader(name, value),
          status: (code: number) => {
            res.statusCode = code;
            return apiRes;
          },
          json: (payload: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          },
        };

        await handler(apiReq, apiRes);
      });
    },
  };
}

function foodSearchDevApi() {
  return {
    name: 'food-search-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/food-search', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost');
        // @ts-expect-error Vercel function is plain JS so it can run without a build step.
        const { default: handler } = await import('./api/food-search.js');
        const apiReq = {
          method: req.method,
          query: Object.fromEntries(url.searchParams.entries()),
        };
        const apiRes = {
          setHeader: (name: string, value: string) => res.setHeader(name, value),
          status: (code: number) => {
            res.statusCode = code;
            return apiRes;
          },
          json: (payload: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          },
        };

        await handler(apiReq, apiRes);
      });
    },
  };
}

function nutritionOcrDevApi() {
  return {
    name: 'nutrition-ocr-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/nutrition-ocr', async (req, res) => {
        const chunks: Buffer[] = [];

        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const rawBody = Buffer.concat(chunks).toString('utf8');
        let body = {};

        try {
          body = rawBody ? JSON.parse(rawBody) : {};
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'invalid_json', message: 'JSON inválido.' }));
          return;
        }

        // @ts-expect-error Vercel function is plain JS so it can run without a build step.
        const { default: handler } = await import('./api/nutrition-ocr.js');
        const apiRes = {
          setHeader: (name: string, value: string) => res.setHeader(name, value),
          status: (code: number) => {
            res.statusCode = code;
            return apiRes;
          },
          json: (payload: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          },
          end: () => res.end(),
        };

        await handler({ method: req.method, body }, apiRes);
      });
    },
  };
}

function mealPhotoAnalysisDevApi() {
  return {
    name: 'meal-photo-analysis-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/meal-photo-analysis', async (req, res) => {
        const chunks: Buffer[] = [];

        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const rawBody = Buffer.concat(chunks).toString('utf8');
        let body = {};

        try {
          body = rawBody ? JSON.parse(rawBody) : {};
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'invalid_json', message: 'JSON inválido.' }));
          return;
        }

        // @ts-expect-error Vercel function is plain JS so it can run without a build step.
        const { default: handler } = await import('./api/meal-photo-analysis.js');
        const apiRes = {
          setHeader: (name: string, value: string) => res.setHeader(name, value),
          status: (code: number) => {
            res.statusCode = code;
            return apiRes;
          },
          json: (payload: unknown) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          },
          end: () => res.end(),
        };

        await handler({ method: req.method, body }, apiRes);
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    foodLookupDevApi(),
    foodSearchDevApi(),
    nutritionOcrDevApi(),
    mealPhotoAnalysisDevApi(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'public/sw.ts',
      },
      registerType: 'prompt',
      includeAssets: [
        'android/mipmap-mdpi/ic_launcher.png',
        'android/mipmap-xxxhdpi/ic_launcher.png',
        'android/ic_launcher-web.png',
        'android/playstore-icon.png',
        'ios/AppIcon.appiconset/Icon-App-60x60@2x.png',
        'ios/AppIcon.appiconset/Icon-App-76x76@2x.png',
        'ios/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png',
        'ios/AppIcon.appiconset/Icon-App-60x60@3x.png',
      ],
      manifest: {
        name: 'NutriTrack',
        short_name: 'NutriTrack',
        description: 'Controle seus nutrientes diários',
        lang: 'pt-BR',
        theme_color: '#16a34a',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'android/mipmap-xxxhdpi/ic_launcher.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android/ic_launcher-web.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android/playstore-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
              },
            },
          },
          {
            urlPattern: ({ request }) => 
              request.destination === 'style' || 
              request.destination === 'script' || 
              request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})
