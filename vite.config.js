import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite minimaliste : React + rafraîchissement à chaud.
export default defineConfig({
  plugins: [react()],
})
