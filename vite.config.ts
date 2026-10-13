import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// GitHub Pages serves this project from /swappy-photo/, not the domain root.
export default defineConfig({
  base: '/swappy-photo/',
  plugins: [react()],
})
