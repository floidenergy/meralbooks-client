import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSvgr from 'vite-plugin-svgr'

import fs from "fs"

export default defineConfig({
  base: '/',
  plugins: [viteSvgr(), react()],
  define: {
    'process.env': process.env
  },
  server: {
    port: 3002,
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem')
    }
  }
})