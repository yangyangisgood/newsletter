// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'css',
    themes: ['dark'],
  },
  css: ["~/assets/style/style.css"],
  routeRules: {
    "/admin/**": { appMiddleware: "auth" },
  },
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
      serverFunctionName: 'server'
    }
  },
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/newsletter/" : "/",
  },
})
