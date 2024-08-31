import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@states": path.resolve(__dirname, "./src/states/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@interface": path.resolve(__dirname, "./src/interface/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@constant": path.resolve(__dirname, "./src/assets/constant"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
