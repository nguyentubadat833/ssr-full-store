import {NuxtAuthHandler} from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import userRepo from "~/server/utils/repositories/userRepo.js";

const {findUser, createUser} = userRepo
export default NuxtAuthHandler({
    secret: useRuntimeConfig().auth.secret,
    providers: [
        GoogleProvider.default({
            clientId: useRuntimeConfig().auth.clientId,
            clientSecret: useRuntimeConfig().auth.secretId
        }),
        CredentialsProvider.default({
            name: 'Credentials',
            // credentials: {
            //     username: { label: "Username", type: "text" },
            //     password: {  label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                console.log('authorize', credentials)
                // console.log('body', req.body)
                // if (user) {
                //     return user
                // } else {
                //     return null
                // }
            }
        })

    ],

    callbacks: {
        /* on before signin */
        async signIn({user, account, profile, email, credentials}) {
            // console.log('user', user)
            // console.log('account', account)
            // console.log('profile', profile)
            // console.log('email', email)

            if (account?.provider === 'google'){
                const googleId = account?.providerAccountId
                const userExists = await findUser({
                    googleId: googleId
                })
                if (userExists){
                    console.log('userExists', userExists)
                }else {
                    const profile = {
                        name: user?.name,
                        email: user?.email,
                        avatar: user?.image
                    }
                    const newUser = await createUser({
                        google_id: googleId,
                        profile: profile
                    })
                    console.log('created user: ', newUser)
                }
            }
            // const logObject = {
            //     type: 'auth_signIn',
            //     data: {
            //         auth_provider: account.provider,
            //         auth_type: account.type,
            //         user_id: user.id,
            //         user_name: user.name,
            //         user_email: user.email,
            //         user_image: user.image,
            //     }
            // }
            // console.log(logObject)
            // logRepo.pushLog(JSON.stringify(logObject))
            return true
        },
        /* on redirect to another url */
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        /* on session retrival */
        async session({session, user, token}) {
            console.log('session', session)
            return session
        },
        /* on JWT token creation or mutation */
        async jwt({token, user, account, profile, isNewUser}) {
            // console.log('token', token)
            // console.log('user', user)
            // console.log('account', account)
            // console.log('profile', profile)
            // console.log('isNewUser', isNewUser)
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