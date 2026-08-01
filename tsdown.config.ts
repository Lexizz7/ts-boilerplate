import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/main.ts"],
  format: "esm",
  clean: true,
  platform: "node",
  target: "node24",
});
