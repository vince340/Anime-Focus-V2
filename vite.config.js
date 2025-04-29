
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
'4ba76690-0695-4570-86c1-69a188319b1b-00-27rm5lrjrgi8b.janeway.replit.dev',
    ]
  }
})
