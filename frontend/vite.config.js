// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      fonts: path.resolve(__dirname, "./src/assets/fonts"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
    },
  },
  define: {
    "global.CustomEvent": "window.CustomEvent",
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
