import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@/pages": path.resolve("src/pages"),
      "@/layouts": path.resolve("src/layouts"),
      "@/routes": path.resolve("src/routes"),
      "@/components": path.resolve("src/components"),
      "@/icons":path.resolve("src/assets/svg"),
      "@/images":path.resolve("src/assets/img"),
      "@/ui":path.resolve("src/components/ui"),
      "@/config":path.resolve("src/config")

    },
  },
  plugins: [react(),svgr()],
});
