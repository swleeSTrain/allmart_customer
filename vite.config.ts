import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: 'autoUpdate',

      workbox: {
        globPatterns: ["**/*.{js,ts,tsx,css,html,ico,svg,woff2,json}"],
        maximumFileSizeToCacheInBytes: 9999999999,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: '올마트',
        short_name: '올마트',
        description: '올마트 - 당신의 일상을 더 편리하게',
        categories: ['shopping', 'lifestyle'],
        theme_color: '#ffffff',
        display: "standalone",
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
    })
  ],
  server:
      {
        host: "0.0.0.0", // 모든 네트워크 인터페이스에서 접속 허용
        port: 5173,      // 기본 포트 (변경 가능)
      },
})
