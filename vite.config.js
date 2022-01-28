import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mars3dCesium from "./build/cesium-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mars3dCesium(),
  ],
});
