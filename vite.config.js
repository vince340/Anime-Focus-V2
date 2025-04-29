
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
      '4b8eaa68-1537-4a2f-a80b-96f6048e9e3e-00-aelq87v3ia6v.spock.replit.dev',
    ]
  }
})
