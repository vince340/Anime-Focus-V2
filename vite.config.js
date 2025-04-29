
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
      'a210f5c3-397f-47e5-8032-888df3bc9ce9-00-1fwfjo8bf7jem.spock.replit.dev',
    ]
  }
})
