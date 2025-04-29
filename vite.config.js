
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
      'd5d6c87c-250f-4e8c-88d8-863190602094-00-2p8i5u035frm2.kirk.replit.dev',
    ]
  }
})
