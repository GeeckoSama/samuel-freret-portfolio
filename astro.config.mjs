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
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        page !== "https://guiltyvision.com/admin/" &&
        page !== "https://guiltyvision.com/admin/projects/" &&
        page !== "https://guiltyvision.com/admin/projects/new/" &&
        page !== "https://guiltyvision.com/signin/",
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
