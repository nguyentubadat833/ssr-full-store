// https://nuxt.com/docs/api/configuration/nuxt-config
import site from "./site";

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
        dirs: [
            'stores',
            'composables',
            'composables/*/index.{ts,js,mjs,mts}',
            'composables/**/**',
            'utils',
            'utils/*/index.{ts,js,mjs,mts}',
            'utils/**/**'

        ]
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
      'nuxt-file-storage',
      'nuxt-time',
      '@nuxtjs/i18n',
    ],
    i18n: {
        locales: site.i18n.locales,
        defaultLocale: site.i18n.defaultLocale,

        // customRoutes: 'config',
        // pages: site.i18n.pages,

        strategy: "prefix_except_default",
        langDir: './i18n/lang/',
        lazy: true,
        vueI18n: '~/i18n/i18n.config.ts',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            onlyOnRoot: true,
        }
    },
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
        },
        resolve: {
            alias: {
                ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
            }
        }
    },
    nitro: {
        experimental: {
            websocket: true
        },
    }
})