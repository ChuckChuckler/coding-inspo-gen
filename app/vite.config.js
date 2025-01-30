import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{
    proxy:{
      "/gen":{
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false
      },
      "/refresh":{
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false
      },
      "/help":{
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
