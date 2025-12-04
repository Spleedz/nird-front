import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Crucial pour le hot-reload dans Docker (surtout sur Windows)
    },
    host: true, // Nécessaire pour exposer le port hors du conteneur
    strictPort: true,
    port: 5173, 
  }
})