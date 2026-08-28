import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite : React + rafraîchissement à chaud + liaison réseau explicite.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})
