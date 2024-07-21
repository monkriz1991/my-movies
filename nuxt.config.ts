import { defineNuxtConfig } from "nuxt/config";
import { version } from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      title: "Movies - Ваша личная коллекцию youtube видео.",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        // Viewport
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        // Phone Number Detection
        {
          hid: "format-detection",
          name: "format-detection",
          content: "telephone=no",
        },
        // Color Scheme (assuming this is the intended meta tag)
        { hid: "color-scheme", name: "color-scheme", content: "light only" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon.png",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      version,
    },
  },
  modules: [
    "nuxt-icon",
    "@nuxt/image-edge",
    "@nuxt/image",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/seo",
    "@nuxt/scripts",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: [100, 300, 400, 500, 600, 700, 800],
          Caveat: [100, 300, 400, 500, 600, 700, 800],
        },
        download: true,
        inject: true,
      },
    ],
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  image: {
    // aliyun: {
    //   baseURL: "https://fastsite.pro/",
    // },
  },
  css: ["@/assets/css/main.scss", "@/node_modules/bulma/css/bulma.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-07-20",
});
