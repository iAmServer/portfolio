import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      name: "Joshua Egbeyemi",
      about:
        "I'm Joshua, an engineer who creates systems that are not just secure, fast, and scalable but also very efficient. My core competencies are in performance optimization, real-time user experience design, and security implementations with a constant eye on the end user. Let’s make something significant.",
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
  routeRules: {
    "/": { static: true, ssr: true },
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
            "I love crafting dynamic, innovative products end-to-end. Obsessed with building intuitive experiences that evolve through data-driven iteration. Always shipping, always improving.",
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
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://iamserver.dev" },
        { property: "og:title", content: "Joshua Egbeyemi" },
        {
          property: "og:description",
          content:
            "I love crafting dynamic, innovative products end-to-end. Obsessed with building intuitive experiences that evolve through data-driven iteration. Always shipping, always improving.",
        },
        { property: "og:image", content: "/seo.jpg" },
        { property: "og:site_name", content: "Joshua Egbeyemi" },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        { property: "twitter:url", content: "https://iamserver.dev" },
        { property: "twitter:title", content: "Joshua Egbeyemi" },
        {
          property: "twitter:description",
          content:
            "I love crafting dynamic, innovative products end-to-end. Obsessed with building intuitive experiences that evolve through data-driven iteration. Always shipping, always improving.",
        },
        {
          property: "twitter:image",
          content: "/seo.jpg",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },
});
