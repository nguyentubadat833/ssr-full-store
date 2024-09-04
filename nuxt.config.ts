// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 3005
    },

    compatibilityDate: '2024-04-03',

    devtools: {enabled: true},

    modules: [
        '@nuxt/ui',
        "nuxt-lodash"
    ],

    srcDir: 'src/',

    extends: [
        './base'
    ],

    imports: {
        // Auto-import pinia stores defined in `~/stores`
        dirs: ['stores']
    },

    css: [
        '@/assets/style/main.scss'
    ],

    experimental: {
        cookieStore: true,
        asyncContext: true,
        sharedPrerenderData: true
    },
})