
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true
    },
    allowedHosts: [
      '3d770adc-c27a-49fb-bcb4-5fe1eea26e54-00-1ihayzwquysze.riker.replit.dev'
    ]
  }
})
