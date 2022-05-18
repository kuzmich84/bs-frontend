import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'


export default NextAuth({
    providers: [
        CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: {type: 'text'},
                    password: {type: 'password'},
                },

                async authorize(credentials: { email: string, password: string }) {
                    try {
                        const {data: user} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                            identifier: credentials?.email,
                            password: credentials?.password,
                        })

                        if (user) {
                            return user
                        } else {
                            return null
                        }

                    } catch (e) {
                        return null

                    }
                },

            },
        ),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user, account}) {
            if (user) {
                token.jwt = user.jwt
                token.id = user.user.id
                token.name = user?.user.username
                token.email = user?.user.email
            }
            return Promise.resolve(token)

        },

        async session({session, token, user}) {
            session.jwt = token.jwt
            session.id = token.id
            return Promise.resolve(session)

        },
    },

    pages: {
        signIn: '/login',
    },
})
