import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import customTheme from '../customTheme'
import Layout from '../components/Layout/Layout'
import {SessionProvider} from 'next-auth/react'


function MyApp({Component, pageProps}: AppProps) {

    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={customTheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </SessionProvider>
    )
}

export default MyApp
