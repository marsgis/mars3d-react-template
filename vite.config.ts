import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mars3dCesium from "vite-plugin-mars3d"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mars3dCesium(),
  ],
});
