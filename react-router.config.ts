import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: true,
  buildDirectory: "./build",
  basename: process.env.NODE_ENV === "production" ? "/react-cls/build/client" : "/",
} satisfies Config;
