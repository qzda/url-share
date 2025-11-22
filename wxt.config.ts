import { defineConfig } from "wxt";
import { displayName, homepage } from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    homepage_url: homepage,
    permissions: ["activeTab", "clipboardWrite"],
    name: displayName,
  },
  outDir: "dist",
});
