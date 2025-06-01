import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  pages:true,
  experimental:{
    payloadExtraction: false
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "nuxt-lodash","@pinia/nuxt","@pinia-plugin-persistedstate/nuxt","@vite-pwa/nuxt", "@nuxtjs/color-mode"],
  pwa: {
    manifest: {
      name:"MCX",
      short_name:"MCX",
      description:"A better way to Network",
      theme_color:"#FFD700",
      icons: [
        {
        src:"pwa-192x192.png",
        sizes:"192x192",
        type: "image/png",
        },
        {
          src:"pwa-512x512.png",
          sizes:"512x512",
          type: "image/png",
          },
        
      ]
    },
    devOptions: {
      enabled:true,
      type:"module",
    },
  },
 
  css: ["~/assets/css/main.css"],
  eslint: {
    config: {
      standalone: false,
    },
  },

  vite: {
    css: {
      postcss: {
        plugins: [require("@tailwindcss/postcss"), require("autoprefixer")],
      },
    },
    plugins: [tailwindcss()],
  },
  colorMode: {
    dataValue: "MCX",
  },
  app:{
    head:{
      charset:'utf-8',
      viewport:'width=device-width, initial-scale-1, maximum-scale=1',
    }
  },
});
