import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 5173,
  },

  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) {
            return "react";
          }

          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }
        },
      },
    },
  },
});