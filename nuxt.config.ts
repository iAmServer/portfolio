import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  runtimeConfig: {
    aiProvider: "anthropic",
    anthropicApiKey: "",
    groqApiKey: "",
    geminiApiKey: "",
    openrouterApiKey: "",
    askModel: "",
    aiBaseUrl: "",
    askDailyLimit: 1000,
    pineconeApiKey: "",
    pineconeIndex: "portfolio",
    pineconeNamespace: "corpus",
    retrievalTopK: 6,
    public: {
      name: "Joshua Egbeyemi",
      role: "Senior Full-Stack Engineer, Identity, Search & Applied AI Systems",
      tagline:
        "Ten-plus years shipping production software, now spent mostly on the layer underneath the product: search infrastructure, access control, and the AI systems that sit on top of both. I rebuilt Accomplishr's search on vector embeddings and cut response time from 5 seconds to under 200ms, then went and did it again for the community feed.",
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "nuxt-og-image",
  ],
  typescript: {
    tsConfig: { exclude: ["../scripts"] },
  },
  nitro: {
    serverAssets: [{ baseName: "corpus", dir: "./corpus" }],
  },
  site: {
    url: "https://iamserver.dev",
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: {
        wght: [400, 500, 700],
      },
      Rubik: {
        wght: [400, 500, 600],
      },
      "IBM Plex Mono": {
        wght: [400, 600],
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
        {
          name: "theme-color",
          content: "#FFFFFF",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#14141F",
          media: "(prefers-color-scheme: dark)",
        },
        { name: "color-scheme", content: "light dark" },
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
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },
});
