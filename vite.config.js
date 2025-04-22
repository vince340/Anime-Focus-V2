
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
      'b6c509d5-b7e5-42f0-b452-70a92ad82cb0-00-35xavb931hl44.janeway.replit.dev'
    ]
  }
})
