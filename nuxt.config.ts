// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'css',
    themes: ['dark'], // 支援深色模式
  },
  css: ["~/assets/style/style.css"],
  routeRules: {
    "/admin/**": { appMiddleware: "auth" },
  },
})
