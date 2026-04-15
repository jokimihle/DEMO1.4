import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, "index.html"),
        impressum: resolve(__dirname, "Impressum.html"),
      },
    },
  },
  base: "/DOC50.2.J/",
});