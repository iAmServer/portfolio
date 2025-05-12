import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      name: "Joshua Egbeyemi",
      about:
        "I enjoy building dynamic, creative products from start to finish. Focused on developing intuitive experiences that constantly grow and improve based on user metrics. Always shipping.",
      role: "Software Engineer | IAM ",
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    display: "swap",
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },
  css: [],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "Joshua Egbeyemi",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        {
          name: "description",
          content:
            "I enjoy building dynamic, creative products from start to finish. Focused on developing intuitive experiences that constantly grow and improve based on user metrics. Always shipping. ",
        },
        { name: "apple-mobile-web-app-title", content: "Joshua Egbeyemi" },
        { name: "author", content: "Joshua Egbeyemi" },
        { name: "aplication-name", content: "Joshua Egbeyemi" },
        { name: "theme-color", content: "#ffffff" },
        { name: "color-scheme", content: "light" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "apple-mobile-web-app-title", content: "Joshua Egbeyemi" },
        {
          property: "og:image",
          content: "/sef.jpeg",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content:
            "I enjoy building dynamic, creative products from start to finish. Focused on developing intuitive experiences that constantly grow and improve based on user metrics. Always shipping.",
        },
      ],
    },
  },
});
