import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'


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
                        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                            identifier: credentials?.email,
                            password: credentials?.password,
                        })

                        if (data) {
                            return data
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
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.jwt = user?.jwt
                token.id = user.user.id
                token.name = user?.user.username
                token.email = user?.user.email
            }
            return Promise.resolve(token)

        },
    },

    pages: {
        signIn: '/login',
    },
})
