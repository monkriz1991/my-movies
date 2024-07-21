import { defineNuxtConfig } from "nuxt/config";
import { version } from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
