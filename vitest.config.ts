import viteConfig from "./vite.config";
import {defineConfig, mergeConfig} from "vite";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setup.ts"],
    }
  })
)