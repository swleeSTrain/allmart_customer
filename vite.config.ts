import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg}']
          },
          manifest: false,
          injectRegister: null,
          disable: true
      })
  ],

  server:
      {
        host: "0.0.0.0", // 모든 네트워크 인터페이스에서 접속 허용
        port: 5173,      // 기본 포트 (변경 가능)
      },
})
