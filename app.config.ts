import { defineConfig } from "@solidjs/start/config";
import tsconfigPath from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  vite: {
    plugins: [tsconfigPath(), tailwindcss()],
  },
  server: {
    prerender: {
      crawlLinks: true,
      ...(isProduction && {ignore: [/^\/api\//]})
    },

    preset: "cloudflare_module",
    compatibilityDate: "2026-03-17"
  }
});