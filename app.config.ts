import { defineConfig } from "@solidjs/start/config";
import tsconfigPath from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins: [tsconfigPath()],
  },
  server: {
    prerender: {
      crawlLinks: true
    }
  }
});
