import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://marois2000.github.io/Physics-Simulator/",
  plugins: [react()],
})
