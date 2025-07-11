import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remove any tailwindcss import line
export default defineConfig({
  plugins: [react()],
});
