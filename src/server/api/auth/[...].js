import {NuxtAuthHandler} from '#auth'
import GoogleProvider from 'next-auth/providers/google'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().auth.secret,
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        GoogleProvider.default({
            clientId: useRuntimeConfig().auth.clientId,
            clientSecret: useRuntimeConfig().auth.secretId
        })
    ],

    callbacks: {
        /* on before signin */
        async signIn({user, account, profile, email, credentials}) {
            // console.log('callback-sinIn-user', user)
            return true
        },
        /* on redirect to another url */
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        /* on session retrival */
        async session({session, user, token}) {
            return session
        },
        /* on JWT token creation or mutation */
        async jwt({token, user, account, profile, isNewUser}) {
            // console.log('token', token)
            return token
        }
    },

    events: {
        async signIn(message) {
        },
        async signOut(message) { /* on signout */
        },
        async createUser(message) { /* user created */
        },
        async updateUser(message) { /* user updated - e.g. their email was verified */
        },
        async linkAccount(message) { /* account (e.g. GitHub) linked to a user */
        },
        async session(message) { /* session is active */
        },
    },

    pages: {
        signIn: '/auth/signIn',
        signOut: '/auth/signOut',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user'
    }
})