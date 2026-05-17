// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import autoImport from "astro-auto-import";

// https://astro.build/config
export default defineConfig({
  site: "https://tibatibangoding.github.io",
  integrations: [autoImport({ imports: [] }), mdx(), sitemap(), react()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Atkinson",
      cssVariable: "--font-atkinson",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/atkinson-regular.woff"],
            weight: 400,
            style: "normal",
            display: "swap",
          },
          {
            src: ["./src/assets/fonts/atkinson-bold.woff"],
            weight: 700,
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],

  vite: {
    // @ts-expect-error - Mengabaikan error tipe (mismatch versi vite dari pnpm) tanpa menggunakan 'any'
    plugins: [tailwindcss()],
  },
});
