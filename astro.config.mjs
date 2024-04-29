import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind()],
  image: {
    service: imageService(),
  },
});
