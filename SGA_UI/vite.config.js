import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
 
const port = process.env.PORT || 80;
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    hosy: true,
    strictPort: true,
    host: '0.0.0.0',
    port: port,
  },
  base: '/SGASystem'
});