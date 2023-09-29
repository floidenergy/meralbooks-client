import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: "./build"
  },
  server: {
    port: 3002,
    https: {
      key: "./cert/key.pem",
      cert: './cert/cert.pem'
    }
  }
})
