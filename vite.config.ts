import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginMars3d } from "vite-plugin-mars3d";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginMars3d(),
  ],
});
