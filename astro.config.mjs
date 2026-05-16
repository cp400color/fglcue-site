// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://fgclue-site.netlify.app", // will be changed when i stop being lazy

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  },

  integrations: [
    sitemap(),
    mdx()
  ],
  adapter: netlify(),
});