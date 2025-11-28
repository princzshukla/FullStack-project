import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remove any tailwindcss import line
export default defineConfig({
  server: {
    proxy:{
      '/api': 'http://localhost:6000'

    }
  },
  plugins: [react()],
});
