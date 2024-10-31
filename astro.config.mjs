import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { imageService } from "@unpic/astro/service";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://guiltyvision.com",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        page !== "https://guiltyvision.com/signin" &&
        "https://guiltyvision.com/admin",
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2024-09-23"),
    }),
    partytown({
      forward: ["dataLayer.push"],
    }),
  ],
  image: {
    service: imageService(),
  },
  adapter: vercel(),
});
