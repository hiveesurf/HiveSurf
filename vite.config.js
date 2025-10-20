import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Using custom domain (CNAME) or user-site -> keep base as "/"
  base: '/',
  plugins: [react(), tailwindcss()],
})
