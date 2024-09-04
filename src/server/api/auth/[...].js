import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'

export default NuxtAuthHandler({

    secret: useRuntimeConfig().authSecret,
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        GoogleProvider.default({
            clientId: 'your-client-id',
            clientSecret: 'your-client-secret'
        })
    ]
})