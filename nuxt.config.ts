// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 3005
    },
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
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
    runtimeConfig: {
        auth: {
            secret: process.env.NUXT_AUTH_SECRET,
            clientId: process.env.NUXT_AUTH_GOOGLE_CLIENT_ID,
            secretId: process.env.NUXT_AUTH_GOOGLE_CLIENT_SECRET
        }
    },

    modules: ['@nuxt/ui', "nuxt-lodash", '@sidebase/nuxt-auth'],
    auth: {
        provider: {
            type: 'authjs',
            trustHost: false,
            defaultProvider: 'google',
            addDefaultCallbackUrl: true
        }
    },

    nitro: {
        experimental: {
            websocket: true
        },
    }
})