import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { imageService } from "@unpic/astro/service";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind()],
  image: {
    service: imageService(),
  },
  adapter: vercel(),
});
