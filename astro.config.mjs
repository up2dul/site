// @ts-check

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import llms from "astro-llms-md";
import robotsTxt from "astro-robots-txt";
import { rehypeLinkedWritingImages } from "./src/lib/rehype-linked-images";

// https://astro.build/config
export default defineConfig({
  site: "https://up2dul.dev",
  markdown: {
    processor: unified({ rehypePlugins: [rehypeLinkedWritingImages] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx(), sitemap(), robotsTxt(), llms()],
});
