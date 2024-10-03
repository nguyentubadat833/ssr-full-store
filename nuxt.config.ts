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
    app: {
        head: {
            meta: [
                {charset: 'UTF-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            ]
        },
        pageTransition: {name: 'page', mode: 'out-in',},
        layoutTransition: {name: 'layout', mode: 'out-in'},
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

    modules: [
        "nuxt-lodash",
        '@sidebase/nuxt-auth',
        "@prisma/nuxt",
        '@nuxt/ui',
        '@nuxt/content',
        'nuxt-file-storage'
    ],

    fileStorage: {
        mount: process.env.NUXT_UPLOAD_URL
    },

    prisma: {
        installStudio: false
    },

    auth: {
        provider: {
            type: 'authjs',
            trustHost: false,
            defaultProvider: 'google',
            addDefaultCallbackUrl: true
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ["legacy-js-api"]
                }
            }
        }
    },

    nitro: {
        experimental: {
            websocket: true
        },
    }
})